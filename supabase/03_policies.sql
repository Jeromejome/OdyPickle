-- 03 · Grants and row-level security. Requires 01 and 02. Safe to re-run.
--
-- Who can do what:
--   Owners (platform_admins)  read and manage everything.
--   Club admins               read their own club; write its board only while it has access.
--   Signed-out visitors       nothing.

revoke all on public.platform_admins, public.clubs, public.club_members, public.club_state from anon;
revoke execute on function public.is_platform_admin(), public.is_club_member(uuid),
  public.club_has_access(uuid), public.claim_memberships() from public, anon;
grant execute on function public.is_platform_admin(), public.is_club_member(uuid),
  public.club_has_access(uuid), public.claim_memberships() to authenticated;

alter table public.platform_admins enable row level security;
alter table public.clubs enable row level security;
alter table public.club_members enable row level security;
alter table public.club_state enable row level security;

-- platform_admins: you can only see your own row. Owners are added with 04_make_owner.sql.
drop policy if exists "admins read self" on public.platform_admins;
create policy "admins read self" on public.platform_admins
  for select to authenticated using (user_id = auth.uid());

-- clubs: members see their club; owners see and manage all.
drop policy if exists "clubs read" on public.clubs;
create policy "clubs read" on public.clubs
  for select to authenticated using (public.is_platform_admin() or public.is_club_member(id));

drop policy if exists "clubs owner write" on public.clubs;
create policy "clubs owner write" on public.clubs
  for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());

-- club_members: users see their own memberships; owners manage all.
drop policy if exists "members read" on public.club_members;
create policy "members read" on public.club_members
  for select to authenticated using (public.is_platform_admin() or user_id = auth.uid());

drop policy if exists "members owner write" on public.club_members;
create policy "members owner write" on public.club_members
  for all to authenticated using (public.is_platform_admin()) with check (public.is_platform_admin());

-- club_state: members read their club; they can write only while the club has access.
drop policy if exists "state read" on public.club_state;
create policy "state read" on public.club_state
  for select to authenticated using (public.is_platform_admin() or public.is_club_member(club_id));

drop policy if exists "state insert" on public.club_state;
create policy "state insert" on public.club_state
  for insert to authenticated with check (
    public.is_platform_admin()
    or (public.is_club_member(club_id) and public.club_has_access(club_id))
  );

drop policy if exists "state update" on public.club_state;
create policy "state update" on public.club_state
  for update to authenticated
  using (
    public.is_platform_admin()
    or (public.is_club_member(club_id) and public.club_has_access(club_id))
  )
  with check (
    public.is_platform_admin()
    or (public.is_club_member(club_id) and public.club_has_access(club_id))
  );
