-- 10 · Member details on club_players: address and contact number.
-- Requires 06. Safe to re-run.
--
-- Members are added on the app's Members page with name, address and contact number. Like the
-- rest of club_players, these are copied from the club's saved board on every save.
-- Only that club's own accounts and OdyZPickle owners can read them (row-level security from 06).

alter table public.club_players add column if not exists address text;
alter table public.club_players add column if not exists contact_number text;

-- Same as 06's sync, plus address and contact number.
create or replace function public.sync_club_players_for(target uuid, board jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
  insert into public.club_players (club_id, player_id, name, status, time_in, time_out, member_since, address, contact_number, updated_at)
  select distinct on (player ->> 'id')
         target,
         player ->> 'id',
         left(coalesce(nullif(trim(player ->> 'name'), ''), '(no name)'), 80),
         case when player ->> 'status' = 'out' then 'out' else 'in' end,
         public.try_timestamptz(player ->> 'timeIn'),
         public.try_timestamptz(player ->> 'timeOut'),
         public.try_timestamptz(player ->> 'memberSince'),
         left(nullif(trim(player ->> 'address'), ''), 160),
         left(nullif(trim(player ->> 'contact'), ''), 20),
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
        address = excluded.address,
        contact_number = excluded.contact_number,
        updated_at = now()
    where (public.club_players.name, public.club_players.status, public.club_players.time_in,
           public.club_players.time_out, public.club_players.member_since,
           public.club_players.address, public.club_players.contact_number)
          is distinct from
          (excluded.name, excluded.status, excluded.time_in, excluded.time_out,
           coalesce(excluded.member_since, public.club_players.member_since),
           excluded.address, excluded.contact_number);
end;
$$;

revoke execute on function public.sync_club_players_for(uuid, jsonb) from public, anon, authenticated;

-- Fill in existing members now.
select public.sync_club_players_for(club_id, data) from public.club_state;
