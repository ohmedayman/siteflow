-- ========================================================
-- SiteFlow — Full Supabase PostgreSQL Schema & Migrations
-- Run this script in your Supabase SQL Editor (supabase.com/dashboard)
-- ========================================================

-- 1. Enable UUID Extension (if not already enabled)
create extension if not exists "uuid-ossp";

-- 2. Profiles Table (Linked with Supabase Auth users)
create table if not exists public.profiles (
  id text primary key,
  email text,
  name text default '',
  plan text default 'free',
  lang text default 'ar',
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Profiles
alter table public.profiles enable row level security;

-- Policies for Profiles
drop policy if exists "Allow public read profiles" on public.profiles;
create policy "Allow public read profiles" on public.profiles
  for select using (true);

drop policy if exists "Allow users to insert profile" on public.profiles;
create policy "Allow users to insert profile" on public.profiles
  for insert with check (true);

drop policy if exists "Allow users to update own profile" on public.profiles;
create policy "Allow users to update own profile" on public.profiles
  for update using (auth.uid()::text = id or id = 'usr_guest');

-- 3. Sites Table (Main website records)
create table if not exists public.sites (
  id text primary key default ('site_' || substr(md5(random()::text), 1, 10)),
  user_id text not null,
  title text not null default 'موقعي الجديد',
  slug text unique not null,
  template_type text default 'blank',
  published boolean default false,
  views integer default 0,
  custom_domain text default '',
  theme jsonb default '{"color": "#6366f1", "font": "Cairo"}'::jsonb,
  seo jsonb default '{"title": "", "description": ""}'::jsonb,
  sections jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for lightning fast lookups
create index if not exists idx_sites_slug on public.sites(slug);
create index if not exists idx_sites_user_id on public.sites(user_id);
create index if not exists idx_sites_published on public.sites(published);

-- Enable RLS on Sites
alter table public.sites enable row level security;

-- Policies for Sites
drop policy if exists "Allow public read published sites" on public.sites;
create policy "Allow public read published sites" on public.sites
  for select using (published = true);

drop policy if exists "Allow select own sites or guest" on public.sites;
create policy "Allow select own sites or guest" on public.sites
  for select using (auth.uid()::text = user_id or user_id = 'usr_guest' or user_id like 'usr_%');

drop policy if exists "Allow insert own sites or guest" on public.sites;
create policy "Allow insert own sites or guest" on public.sites
  for insert with check (true);

drop policy if exists "Allow update own sites or guest" on public.sites;
create policy "Allow update own sites or guest" on public.sites
  for update using (true);

drop policy if exists "Allow delete own sites or guest" on public.sites;
create policy "Allow delete own sites or guest" on public.sites
  for delete using (true);

-- 4. Sections Table (Normalized alternative fallback)
create table if not exists public.sections (
  id uuid primary key default uuid_generate_v4(),
  site_id text references public.sites(id) on delete cascade,
  type text not null,
  data jsonb not null default '{}'::jsonb,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_sections_site_id on public.sections(site_id);
alter table public.sections enable row level security;
drop policy if exists "Sections all access" on public.sections;
create policy "Sections all access" on public.sections for all using (true) with check (true);

-- 5. SEO Table (Normalized alternative fallback)
create table if not exists public.seo (
  site_id text primary key references public.sites(id) on delete cascade,
  title text default '',
  description text default '',
  og_image text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.seo enable row level security;
drop policy if exists "SEO all access" on public.seo;
create policy "SEO all access" on public.seo for all using (true) with check (true);

-- 6. Themes Table (Normalized alternative fallback)
create table if not exists public.themes (
  site_id text primary key references public.sites(id) on delete cascade,
  color text default '#6366f1',
  font text default 'Cairo',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.themes enable row level security;
drop policy if exists "Themes all access" on public.themes;
create policy "Themes all access" on public.themes for all using (true) with check (true);

-- 7. Payments Table
create table if not exists public.payments (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  amount numeric not null default 0,
  currency text default 'EGP',
  plan text not null,
  status text default 'completed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payments enable row level security;
drop policy if exists "Payments all access" on public.payments;
create policy "Payments all access" on public.payments for all using (true) with check (true);

-- 8. Increment Site Views Function
create or replace function public.increment_views(site_slug text)
returns void as $$
begin
  update public.sites
  set views = coalesce(views, 0) + 1
  where slug = site_slug;
end;
$$ language plpgsql security definer;

-- 9. Automatic Updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_sites_updated_at on public.sites;
create trigger trigger_sites_updated_at
  before update on public.sites
  for each row execute function public.set_updated_at();

-- ========================================================
-- Finished! Your SiteFlow database is fully configured.
-- ========================================================
