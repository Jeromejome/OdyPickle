-- 01 · Tables. Safe to re-run.
--
--   platform_admins  OdyZPickle owners (you). Can see and manage every club.
--   clubs            One row per customer club, with its subscription status.
--   club_members     Emails allowed into a club. A member is linked to a login
--                    (user_id) the first time that email signs in.
--   club_state       Each club's players + rounds, stored as one JSON document.

create table if not exists public.platform_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 80),
  status text not null default 'trial' check (status in ('trial', 'active', 'suspended')),
  -- Last day the club can make changes. Null = no end date.
  access_until date,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.club_members (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs (id) on delete cascade,
  email text not null check (email = lower(trim(email)) and position('@' in email) > 1),
  user_id uuid references auth.users (id) on delete set null,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now(),
  unique (club_id, email)
);
create index if not exists club_members_user_id_idx on public.club_members (user_id);
create index if not exists club_members_email_idx on public.club_members (email);

create table if not exists public.club_state (
  club_id uuid primary key references public.clubs (id) on delete cascade,
  data jsonb not null default '{"players": [], "rounds": []}'::jsonb,
  updated_at timestamptz not null default now()
);
