-- 05 · Game log: an append-only history of everything that happens on a club's board.
-- Requires 01–03. Safe to re-run.
--
-- Each event stores a human-readable summary plus a snapshot of the whole board right
-- after it happened, so a club can look back through its games and restore any point.

create table if not exists public.club_events (
  id bigint generated always as identity primary key,
  club_id uuid not null references public.clubs (id) on delete cascade,
  created_at timestamptz not null default now(),
  actor_id uuid references auth.users (id) on delete set null,
  actor_email text,
  kind text not null check (length(kind) between 1 and 40),
  summary text not null check (length(summary) between 1 and 500),
  details jsonb not null default '{}'::jsonb,
  snapshot jsonb not null
);
create index if not exists club_events_club_time_idx on public.club_events (club_id, created_at desc, id desc);

-- Who and when are always set by the database, never trusted from the browser.
create or replace function public.stamp_club_event()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  new.created_at = now();
  new.actor_id = auth.uid();
  new.actor_email = (select email from auth.users where id = auth.uid());
  return new;
end;
$$;

drop trigger if exists club_events_stamp on public.club_events;
create trigger club_events_stamp before insert on public.club_events
  for each row execute function public.stamp_club_event();

-- Saves the board and its log entries together: either both are stored or neither is.
-- Runs with the caller's permissions, so the row-level security below still applies.
create or replace function public.save_club_state(target uuid, new_data jsonb, events jsonb default '[]'::jsonb)
returns timestamptz language plpgsql security invoker set search_path = '' as $$
declare
  saved_at timestamptz;
begin
  insert into public.club_state (club_id, data) values (target, new_data)
  on conflict (club_id) do update set data = excluded.data
  returning updated_at into saved_at;

  insert into public.club_events (club_id, kind, summary, details, snapshot)
  select target,
         event ->> 'kind',
         left(event ->> 'summary', 500),
         coalesce(event -> 'details', '{}'::jsonb),
         coalesce(event -> 'snapshot', new_data)
  from jsonb_array_elements(coalesce(events, '[]'::jsonb)) as event;

  return saved_at;
end;
$$;

revoke all on public.club_events from anon;
revoke execute on function public.save_club_state(uuid, jsonb, jsonb) from public, anon;
grant execute on function public.save_club_state(uuid, jsonb, jsonb) to authenticated;

alter table public.club_events enable row level security;

-- Read: the club's own members, and owners.
drop policy if exists "events read" on public.club_events;
create policy "events read" on public.club_events
  for select to authenticated using (public.is_platform_admin() or public.is_club_member(club_id));

-- Add: members while the club has access, and owners. No update/delete policy → the log can't be rewritten.
drop policy if exists "events insert" on public.club_events;
create policy "events insert" on public.club_events
  for insert to authenticated with check (
    public.is_platform_admin()
    or (public.is_club_member(club_id) and public.club_has_access(club_id))
  );
