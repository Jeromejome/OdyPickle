-- 06 · Club members as their own table, one row per member per club.
-- Requires 01–03. Safe to re-run.
--
-- The app keeps saving each club's board to club_state as before. A trigger copies the club's
-- players into club_players on every save, so this table always matches what the app shows.
-- Members are never deleted by the app, so rows are only added or updated here.
--
-- Note: edit members in the app, not in this table. Changes made directly here are overwritten
-- the next time the club's board is saved.

create table if not exists public.club_players (
  club_id uuid not null references public.clubs (id) on delete cascade,
  player_id text not null,              -- the app's id for the player
  name text not null,
  status text not null default 'in' check (status in ('in', 'out')),
  time_in timestamptz,                  -- last time they were timed in
  time_out timestamptz,                 -- last time they were timed out
  member_since timestamptz,             -- when added on the Members page (if added there)
  first_seen timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (club_id, player_id)
);
create index if not exists club_players_club_name_idx on public.club_players (club_id, lower(name));

-- Reads a timestamp from the app's data; anything unreadable becomes null instead of failing the save.
create or replace function public.try_timestamptz(value text)
returns timestamptz language plpgsql stable set search_path = '' as $$
begin
  if value is null or value = '' then
    return null;
  end if;
  return value::timestamptz;
exception when others then
  return null;
end;
$$;

-- Copies one club's players from its saved board into club_players.
create or replace function public.sync_club_players_for(target uuid, board jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
  insert into public.club_players (club_id, player_id, name, status, time_in, time_out, member_since, updated_at)
  select distinct on (player ->> 'id')
         target,
         player ->> 'id',
         left(coalesce(nullif(trim(player ->> 'name'), ''), '(no name)'), 80),
         case when player ->> 'status' = 'out' then 'out' else 'in' end,
         public.try_timestamptz(player ->> 'timeIn'),
         public.try_timestamptz(player ->> 'timeOut'),
         public.try_timestamptz(player ->> 'memberSince'),
         now()
  from jsonb_array_elements(
         case when jsonb_typeof(board -> 'players') = 'array' then board -> 'players' else '[]'::jsonb end
       ) as player
  where coalesce(player ->> 'id', '') <> ''
  on conflict (club_id, player_id) do update
    set name = excluded.name,
        status = excluded.status,
        time_in = excluded.time_in,
        time_out = excluded.time_out,
        member_since = coalesce(excluded.member_since, public.club_players.member_since),
        updated_at = now()
    where (public.club_players.name, public.club_players.status, public.club_players.time_in,
           public.club_players.time_out, public.club_players.member_since)
          is distinct from
          (excluded.name, excluded.status, excluded.time_in, excluded.time_out,
           coalesce(excluded.member_since, public.club_players.member_since));
end;
$$;

create or replace function public.sync_club_players()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  perform public.sync_club_players_for(new.club_id, new.data);
  return new;
end;
$$;

drop trigger if exists club_state_sync_players on public.club_state;
create trigger club_state_sync_players
  after insert or update of data on public.club_state
  for each row execute function public.sync_club_players();

-- Access: club members and owners can read their club's rows. Nobody writes directly —
-- only the trigger above does.
revoke all on public.club_players from anon;
revoke insert, update, delete on public.club_players from authenticated;
revoke execute on function public.sync_club_players_for(uuid, jsonb) from public, anon, authenticated;

alter table public.club_players enable row level security;

drop policy if exists "players read" on public.club_players;
create policy "players read" on public.club_players
  for select to authenticated using (public.is_platform_admin() or public.is_club_member(club_id));

-- Copy every club's existing members in now.
select public.sync_club_players_for(club_id, data) from public.club_state;
