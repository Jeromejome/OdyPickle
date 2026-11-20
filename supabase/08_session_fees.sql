-- 08 · Open play fees, attendance, payments and amount collected.
-- Requires 06 (try_timestamptz) and 07. Safe to re-run.
--
-- Members (registered on the Members page) pay the member fee; everyone else pays the
-- non-member fee. Adds columns and a small trigger that fills them from the app's saved data.
-- It runs right after 07's history sync (triggers on the same table fire in name order), so the
-- session rows already exist when this updates them.

alter table public.club_sessions add column if not exists fee_member numeric(10, 2);    -- ₱ per member (0 = free)
alter table public.club_sessions add column if not exists fee_guest numeric(10, 2);     -- ₱ per non-member (0 = free)
alter table public.club_sessions add column if not exists attendees integer;            -- players who came (saved when finished)
alter table public.club_sessions add column if not exists members_came integer;         -- of which members
alter table public.club_sessions add column if not exists guests_came integer;          -- of which non-members
alter table public.club_sessions add column if not exists collection numeric(12, 2);    -- expected: members × member fee + non-members × non-member fee
alter table public.club_sessions add column if not exists paid_total numeric(12, 2);    -- actually paid (marked Paid in the app)
alter table public.club_sessions add column if not exists unpaid_count integer;         -- players who came but weren't marked paid

-- One row per player who paid, per open play: amount, method (cash / gcash / maya / bank) and when.
create table if not exists public.club_payments (
  club_id uuid not null references public.clubs (id) on delete cascade,
  session_id text not null,
  player_id text not null,
  player_name text not null,
  member boolean not null default false,
  method text not null,
  amount numeric(10, 2) not null,
  paid_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (club_id, session_id, player_id)
);
create index if not exists club_payments_club_time_idx on public.club_payments (club_id, paid_at desc);
-- An earlier draft of this script used a single fee column; it's kept if it already exists.

create or replace function public.try_numeric(value text)
returns numeric language sql immutable set search_path = '' as $$
  select case when value ~ '^-?\d{1,10}(\.\d{1,4})?$' then value::numeric end;
$$;

-- Copies fees / attendance / collection for one club's sessions. Sessions saved with one
-- "feePerHead" (before member/non-member fees) use it for both.
create or replace function public.sync_club_session_fees_for(target uuid, board jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update public.club_sessions as s
  set fee_member = src.fee_member,
      fee_guest = src.fee_guest,
      attendees = coalesce(src.attendees, s.attendees),
      members_came = coalesce(src.members_came, s.members_came),
      guests_came = coalesce(src.guests_came, s.guests_came),
      collection = coalesce(src.collection, s.collection),
      paid_total = coalesce(src.paid_total, s.paid_total),
      unpaid_count = coalesce(src.unpaid_count, s.unpaid_count),
      updated_at = now()
  from (
    select distinct on (session ->> 'id')
           session ->> 'id' as session_id,
           coalesce(public.try_numeric(session ->> 'feeMember'), public.try_numeric(session ->> 'feePerHead')) as fee_member,
           coalesce(public.try_numeric(session ->> 'feeGuest'), public.try_numeric(session ->> 'feePerHead')) as fee_guest,
           public.try_int(session ->> 'attendees') as attendees,
           public.try_int(session ->> 'membersCame') as members_came,
           public.try_int(session ->> 'guestsCame') as guests_came,
           public.try_numeric(session ->> 'collection') as collection,
           public.try_numeric(session ->> 'paidTotal') as paid_total,
           public.try_int(session ->> 'unpaidCount') as unpaid_count
    from jsonb_array_elements(
           (case when jsonb_typeof(board -> 'sessions') = 'array' then board -> 'sessions' else '[]'::jsonb end)
           || (case when jsonb_typeof(board -> 'session') = 'object' then jsonb_build_array(board -> 'session') else '[]'::jsonb end)
         ) as session
    where coalesce(session ->> 'id', '') <> ''
  ) as src
  where s.club_id = target
    and s.session_id = src.session_id
    and (s.fee_member, s.fee_guest, s.attendees, s.members_came, s.guests_came, s.collection, s.paid_total, s.unpaid_count) is distinct from (
      src.fee_member, src.fee_guest,
      coalesce(src.attendees, s.attendees), coalesce(src.members_came, s.members_came),
      coalesce(src.guests_came, s.guests_came), coalesce(src.collection, s.collection),
      coalesce(src.paid_total, s.paid_total), coalesce(src.unpaid_count, s.unpaid_count)
    );

  -- Payments: one row per player who paid, per session. "Undo" in the app removes the row.
  with sessions as (
    select distinct on (session ->> 'id') session ->> 'id' as session_id, session -> 'payments' as payments
    from jsonb_array_elements(
           (case when jsonb_typeof(board -> 'sessions') = 'array' then board -> 'sessions' else '[]'::jsonb end)
           || (case when jsonb_typeof(board -> 'session') = 'object' then jsonb_build_array(board -> 'session') else '[]'::jsonb end)
         ) as session
    where coalesce(session ->> 'id', '') <> ''
  ),
  paid as (
    select s.session_id, p.key as player_id, p.value as payment
    from sessions s
    cross join lateral jsonb_each(case when jsonb_typeof(s.payments) = 'object' then s.payments else '{}'::jsonb end) as p
  ),
  removed as (
    delete from public.club_payments cp
    using sessions s
    where cp.club_id = target
      and cp.session_id = s.session_id
      and not exists (select 1 from paid where paid.session_id = cp.session_id and paid.player_id = cp.player_id)
  )
  insert into public.club_payments (club_id, session_id, player_id, player_name, member, method, amount, paid_at, updated_at)
  select target, session_id, player_id,
         left(coalesce(nullif(payment ->> 'name', ''), '(no name)'), 80),
         (payment ->> 'member') = 'true',
         left(coalesce(payment ->> 'method', 'cash'), 30),
         coalesce(public.try_numeric(payment ->> 'amount'), 0),
         public.try_timestamptz(payment ->> 'at'),
         now()
  from paid
  on conflict (club_id, session_id, player_id) do update
    set player_name = excluded.player_name,
        member = excluded.member,
        method = excluded.method,
        amount = excluded.amount,
        paid_at = excluded.paid_at,
        updated_at = now()
    where (public.club_payments.method, public.club_payments.amount, public.club_payments.paid_at)
          is distinct from (excluded.method, excluded.amount, excluded.paid_at);
end;
$$;

create or replace function public.sync_club_session_fees()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  perform public.sync_club_session_fees_for(new.club_id, new.data);
  return new;
end;
$$;

-- Named so it sorts after "club_state_sync_history" and runs after it.
drop trigger if exists club_state_sync_history_fees on public.club_state;
create trigger club_state_sync_history_fees
  after insert or update of data on public.club_state
  for each row execute function public.sync_club_session_fees();

revoke execute on function public.sync_club_session_fees_for(uuid, jsonb) from public, anon, authenticated;

-- club_payments: club members and owners can read their club's rows; only the trigger writes.
revoke all on public.club_payments from anon;
revoke insert, update, delete on public.club_payments from authenticated;
alter table public.club_payments enable row level security;
drop policy if exists "payments read" on public.club_payments;
create policy "payments read" on public.club_payments
  for select to authenticated using (public.is_platform_admin() or public.is_club_member(club_id));

-- Fill in existing sessions now.
select public.sync_club_session_fees_for(club_id, data) from public.club_state;
