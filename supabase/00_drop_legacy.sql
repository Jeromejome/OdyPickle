-- 00 · Remove the first single-club version.
-- Run in Supabase Dashboard → SQL Editor. Run the files in this folder in number order.
--
-- The first version stored one shared club in a world-writable `club_state`
-- table keyed by a text `id`. 01_tables.sql recreates `club_state` per club.
-- This only drops the table when it still has the old shape, so it is safe to re-run.

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'club_state' and column_name = 'id'
  ) then
    drop table public.club_state;
  end if;
end $$;
