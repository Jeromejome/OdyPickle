-- 07 · Game history as tables, per club: every played game and every open play session.
-- Requires 01–03 and 06 (uses try_timestamptz). Safe to re-run.
--
-- Like club_players, these are filled automatically from each club's saved board (club_state)
-- by a trigger, so the app doesn't change. Rows are added or updated, never deleted here — the
-- tables are a permanent archive of each club's games, even if a board is later overwritten.
--
-- Edit games in the app, not in these tables: direct changes are overwritten on the next save.

-- ---------------------------------------------------------------- tables

create table if not exists public.club_matches (
  club_id uuid not null references public.clubs (id) on delete cascade,
  match_id text not null,               -- the app's id for the game
  session_id text,                      -- open play session it belongs to (null for older games)
  round_number integer,
  play_date date,                       -- open play date (null for games before dates were saved)
  court text not null,
  format text not null check (format in ('doubles', 'singles')),
  bracket text,                         -- Open / Winners / Challengers / Mixed / Custom
  team_a text[] not null,               -- player names
  team_b text[] not null,
  team_a_ids text[] not null,           -- the app's player ids (match club_players.player_id)
  team_b_ids text[] not null,
  winner text not null check (winner in ('A', 'B')),
  winners text[] not null,
  losers text[] not null,
  played_at timestamptz,                -- when the result was recorded
  done_at timestamptz,                  -- when the court was marked Done
  first_seen timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (club_id, match_id)
);
create index if not exists club_matches_club_date_idx on public.club_matches (club_id, play_date desc);
create index if not exists club_matches_session_idx on public.club_matches (club_id, session_id);

create table if not exists public.club_sessions (
  club_id uuid not null references public.clubs (id) on delete cascade,
  session_id text not null,
  mode text not null default 'open_play',
  play_date date,
  venue text,
  start_time time,
  end_time time,
  format text,
  court_count integer,
  started_at timestamptz,
  finished_at timestamptz,              -- null while the open play is still running
  games integer,                        -- totals saved when the open play was finished
  players integer,
  first_seen timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (club_id, session_id)
);
create index if not exists club_sessions_club_date_idx on public.club_sessions (club_id, play_date desc);

-- ---------------------------------------------------------------- helpers

-- Names / ids from a team array in the app's data ([{ "id": ..., "name": ... }, ...]).
create or replace function public.team_field(team jsonb, field text)
returns text[] language sql immutable set search_path = '' as $$
  select coalesce(array_agg(coalesce(player ->> field, '') order by idx), '{}')
  from jsonb_array_elements(case when jsonb_typeof(team) = 'array' then team else '[]'::jsonb end)
       with ordinality as t(player, idx);
$$;

create or replace function public.try_date(value text)
returns date language sql immutable set search_path = '' as $$
  select case when value ~ '^\d{4}-\d{2}-\d{2}$' then value::date end;
$$;

create or replace function public.try_time(value text)
returns time language sql immutable set search_path = '' as $$
  select case when value ~ '^\d{1,2}:\d{2}(:\d{2})?$' then value::time end;
$$;

create or replace function public.try_int(value text)
returns integer language sql immutable set search_path = '' as $$
  select case when value ~ '^-?\d{1,9}$' then value::integer end;
$$;

-- ---------------------------------------------------------------- sync

-- Copies one club's played games and sessions from its saved board into the history tables.
create or replace function public.sync_club_history_for(target uuid, board jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
  -- Played games (those with a winner).
  insert into public.club_matches (
    club_id, match_id, session_id, round_number, play_date, court, format, bracket,
    team_a, team_b, team_a_ids, team_b_ids, winner, winners, losers, played_at, done_at, updated_at
  )
  select distinct on (game ->> 'id')
         target,
         game ->> 'id',
         nullif(round ->> 'sessionId', ''),
         public.try_int(round ->> 'number'),
         public.try_date(round ->> 'date'),
         left(coalesce(nullif(game ->> 'court', ''), 'Court ' || idx), 60),
         case
           when game ->> 'format' in ('doubles', 'singles') then game ->> 'format'
           when jsonb_typeof(game -> 'teamA') = 'array' and jsonb_array_length(game -> 'teamA') = 1 then 'singles'
           else 'doubles'
         end,
         nullif(game ->> 'bracket', ''),
         public.team_field(game -> 'teamA', 'name'),
         public.team_field(game -> 'teamB', 'name'),
         public.team_field(game -> 'teamA', 'id'),
         public.team_field(game -> 'teamB', 'id'),
         game ->> 'winner',
         public.team_field(case when game ->> 'winner' = 'A' then game -> 'teamA' else game -> 'teamB' end, 'name'),
         public.team_field(case when game ->> 'winner' = 'A' then game -> 'teamB' else game -> 'teamA' end, 'name'),
         public.try_timestamptz(game ->> 'playedAt'),
         public.try_timestamptz(game ->> 'doneAt'),
         now()
  from jsonb_array_elements(
         case when jsonb_typeof(board -> 'rounds') = 'array' then board -> 'rounds' else '[]'::jsonb end
       ) as round
  cross join lateral jsonb_array_elements(
         case when jsonb_typeof(round -> 'matches') = 'array' then round -> 'matches' else '[]'::jsonb end
       ) with ordinality as games(game, idx)
  where game ->> 'winner' in ('A', 'B')
    and coalesce(game ->> 'id', '') <> ''
  on conflict (club_id, match_id) do update
    set session_id = coalesce(excluded.session_id, public.club_matches.session_id),
        round_number = excluded.round_number,
        play_date = coalesce(excluded.play_date, public.club_matches.play_date),
        court = excluded.court,
        format = excluded.format,
        bracket = excluded.bracket,
        team_a = excluded.team_a,
        team_b = excluded.team_b,
        team_a_ids = excluded.team_a_ids,
        team_b_ids = excluded.team_b_ids,
        winner = excluded.winner,
        winners = excluded.winners,
        losers = excluded.losers,
        played_at = coalesce(excluded.played_at, public.club_matches.played_at),
        done_at = coalesce(excluded.done_at, public.club_matches.done_at),
        updated_at = now()
    where (public.club_matches.winner, public.club_matches.court, public.club_matches.team_a_ids,
           public.club_matches.team_b_ids, public.club_matches.done_at, public.club_matches.played_at)
          is distinct from
          (excluded.winner, excluded.court, excluded.team_a_ids, excluded.team_b_ids,
           coalesce(excluded.done_at, public.club_matches.done_at),
           coalesce(excluded.played_at, public.club_matches.played_at));

  -- Open play sessions (finished ones, plus the one running now).
  insert into public.club_sessions (
    club_id, session_id, mode, play_date, venue, start_time, end_time, format, court_count,
    started_at, finished_at, games, players, updated_at
  )
  select distinct on (session ->> 'id')
         target,
         session ->> 'id',
         coalesce(nullif(session ->> 'mode', ''), 'open_play'),
         public.try_date(session ->> 'date'),
         left(nullif(trim(session ->> 'venue'), ''), 120),
         public.try_time(session ->> 'startTime'),
         public.try_time(session ->> 'endTime'),
         nullif(session ->> 'format', ''),
         public.try_int(session ->> 'courtCount'),
         public.try_timestamptz(session ->> 'startedAt'),
         public.try_timestamptz(session ->> 'finishedAt'),
         public.try_int(session ->> 'games'),
         public.try_int(session ->> 'players'),
         now()
  from jsonb_array_elements(
         (case when jsonb_typeof(board -> 'sessions') = 'array' then board -> 'sessions' else '[]'::jsonb end)
         || (case when jsonb_typeof(board -> 'session') = 'object' then jsonb_build_array(board -> 'session') else '[]'::jsonb end)
       ) as session
  where coalesce(session ->> 'id', '') <> ''
  on conflict (club_id, session_id) do update
    set mode = excluded.mode,
        play_date = excluded.play_date,
        venue = excluded.venue,
        start_time = excluded.start_time,
        end_time = excluded.end_time,
        format = excluded.format,
        court_count = excluded.court_count,
        started_at = coalesce(excluded.started_at, public.club_sessions.started_at),
        finished_at = coalesce(excluded.finished_at, public.club_sessions.finished_at),
        games = coalesce(excluded.games, public.club_sessions.games),
        players = coalesce(excluded.players, public.club_sessions.players),
        updated_at = now()
    where (public.club_sessions.venue, public.club_sessions.start_time, public.club_sessions.end_time,
           public.club_sessions.format, public.club_sessions.court_count, public.club_sessions.finished_at,
           public.club_sessions.games, public.club_sessions.players)
          is distinct from
          (excluded.venue, excluded.start_time, excluded.end_time, excluded.format, excluded.court_count,
           coalesce(excluded.finished_at, public.club_sessions.finished_at),
           coalesce(excluded.games, public.club_sessions.games),
           coalesce(excluded.players, public.club_sessions.players));
end;
$$;

create or replace function public.sync_club_history()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  perform public.sync_club_history_for(new.club_id, new.data);
  return new;
end;
$$;

drop trigger if exists club_state_sync_history on public.club_state;
create trigger club_state_sync_history
  after insert or update of data on public.club_state
  for each row execute function public.sync_club_history();

-- ---------------------------------------------------------------- access
-- Club members and owners can read their club's rows. Nobody writes directly — only the trigger.

revoke all on public.club_matches, public.club_sessions from anon;
revoke insert, update, delete on public.club_matches, public.club_sessions from authenticated;
revoke execute on function public.sync_club_history_for(uuid, jsonb) from public, anon, authenticated;

alter table public.club_matches enable row level security;
alter table public.club_sessions enable row level security;

drop policy if exists "matches read" on public.club_matches;
create policy "matches read" on public.club_matches
  for select to authenticated using (public.is_platform_admin() or public.is_club_member(club_id));

drop policy if exists "sessions read" on public.club_sessions;
create policy "sessions read" on public.club_sessions
  for select to authenticated using (public.is_platform_admin() or public.is_club_member(club_id));

-- Copy every club's existing games and sessions in now.
select public.sync_club_history_for(club_id, data) from public.club_state;
