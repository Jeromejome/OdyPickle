-- 04 · Make an account an OdyZPickle owner (access to the owner dashboard).
-- First create the account on login.html and confirm the email.
-- Then replace the email below and run this. Safe to re-run.

insert into public.platform_admins (user_id)
select id from auth.users where email = 'jeromebdeborja@gmail.com'
on conflict do nothing;
