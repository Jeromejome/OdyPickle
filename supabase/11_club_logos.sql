-- 11 · Club logos: one logo per club, uploaded from the Owner dashboard.
-- Requires 01–03. Safe to re-run.
--
-- Logos are stored in the Supabase Storage bucket "club-logos" as <club id>/logo.png
-- (the app resizes to at most 512 px before uploading). The bucket is public so logos can be
-- shown on the club's pages; only OdyZPickle owners can upload, replace or remove them.

alter table public.clubs add column if not exists logo_url text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('club-logos', 'club-logos', true, 2097152, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Owners can list / upload / replace / remove logos. (Viewing works for everyone via the
-- public URL, so no read policy is needed for that.)
drop policy if exists "club logos owner read" on storage.objects;
create policy "club logos owner read" on storage.objects
  for select to authenticated
  using (bucket_id = 'club-logos' and public.is_platform_admin());

drop policy if exists "club logos owner insert" on storage.objects;
create policy "club logos owner insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'club-logos' and public.is_platform_admin());

drop policy if exists "club logos owner update" on storage.objects;
create policy "club logos owner update" on storage.objects
  for update to authenticated
  using (bucket_id = 'club-logos' and public.is_platform_admin())
  with check (bucket_id = 'club-logos' and public.is_platform_admin());

drop policy if exists "club logos owner delete" on storage.objects;
create policy "club logos owner delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'club-logos' and public.is_platform_admin());
