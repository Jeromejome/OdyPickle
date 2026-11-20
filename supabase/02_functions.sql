-- 02 · Functions and triggers. Requires 01_tables.sql. Safe to re-run.
-- Helpers are security definer so policies can check membership without recursive RLS.

create or replace function public.is_platform_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.platform_admins where user_id = auth.uid());
$$;

create or replace function public.is_club_member(target uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.club_members where club_id = target and user_id = auth.uid()
  );
$$;

-- True while a club may record changes. Mirrored by clubHasAccess() in session.js.
create or replace function public.club_has_access(target uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.clubs c
    where c.id = target
      and c.status <> 'suspended'
      and (c.access_until is null or c.access_until >= current_date)
  );
$$;

-- Links the signed-in user to every club that listed their (confirmed) email.
create or replace function public.claim_memberships()
returns integer language plpgsql security definer set search_path = '' as $$
declare
  user_email text;
  claimed integer;
begin
  select lower(email) into user_email
  from auth.users
  where id = auth.uid() and email_confirmed_at is not null;

  if user_email is null then
    return 0;
  end if;

  update public.club_members
  set user_id = auth.uid()
  where user_id is null and email = user_email;
  get diagnostics claimed = row_count;
  return claimed;
end;
$$;

-- Every new club starts with an empty board.
create or replace function public.create_club_state()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.club_state (club_id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists clubs_create_state on public.clubs;
create trigger clubs_create_state after insert on public.clubs
  for each row execute function public.create_club_state();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists club_state_touch on public.club_state;
create trigger club_state_touch before update on public.club_state
  for each row execute function public.touch_updated_at();
