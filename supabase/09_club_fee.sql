-- 09 · Each club's default open play fees (member / non-member), on the clubs table.
-- Requires 01–03 and 08 (uses try_numeric). Safe to re-run.
--
-- The club sets its default fees in the app (Open play setup → "Save as the club's default fees").
-- They're saved with the club's board; this trigger copies them to the clubs table so every
-- club's fees are visible in one place. A single older "feePerHead" setting counts for both.

alter table public.clubs add column if not exists member_fee numeric(10, 2);   -- ₱ per member (null = not set, 0 = free)
alter table public.clubs add column if not exists guest_fee numeric(10, 2);    -- ₱ per non-member

create or replace function public.club_fees_from(board jsonb, out member_fee numeric, out guest_fee numeric)
language sql immutable set search_path = '' as $$
  select coalesce(public.try_numeric(board -> 'settings' ->> 'feeMember'), public.try_numeric(board -> 'settings' ->> 'feePerHead')),
         coalesce(public.try_numeric(board -> 'settings' ->> 'feeGuest'), public.try_numeric(board -> 'settings' ->> 'feePerHead'));
$$;

create or replace function public.sync_club_fee()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  fees record;
begin
  select * into fees from public.club_fees_from(new.data);
  update public.clubs
  set member_fee = fees.member_fee,
      guest_fee = fees.guest_fee
  where id = new.club_id
    and (member_fee, guest_fee) is distinct from (fees.member_fee, fees.guest_fee);
  return new;
end;
$$;

drop trigger if exists club_state_sync_fee on public.club_state;
create trigger club_state_sync_fee
  after insert or update of data on public.club_state
  for each row execute function public.sync_club_fee();

-- Fill in existing clubs now.
update public.clubs c
set member_fee = f.member_fee,
    guest_fee = f.guest_fee
from public.club_state s
cross join lateral public.club_fees_from(s.data) as f
where s.club_id = c.id
  and (c.member_fee, c.guest_fee) is distinct from (f.member_fee, f.guest_fee);
