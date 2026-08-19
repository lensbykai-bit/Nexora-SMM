-- Nexora SMM v1.4.0 — dynamic service catalog
create table if not exists public.services (
  id text primary key check (id ~ '^[a-z0-9][a-z0-9-]{1,63}$'),
  category text not null check (category in ('content','ads','analytics','community')),
  platform text not null default 'all' check (platform in ('all','tiktok','facebook','youtube','instagram','telegram','website')),
  price numeric(12,2) not null default 0 check (price >= 0 and price <= 10000),
  min_quantity integer not null default 1 check (min_quantity >= 1 and min_quantity <= 10000),
  max_quantity integer not null default 1 check (max_quantity >= min_quantity and max_quantity <= 10000),
  name_km text not null check (char_length(name_km) between 2 and 120),
  name_en text not null check (char_length(name_en) between 2 and 120),
  time_km text not null default '', time_en text not null default '',
  start_km text not null default '', start_en text not null default '',
  speed_km text not null default '', speed_en text not null default '',
  details_km text not null default '', details_en text not null default '',
  is_active boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.services enable row level security;
grant select, insert, update on public.services to authenticated;
revoke delete on public.services from authenticated;

create or replace function public.can_manage_services()
returns boolean language sql stable security invoker set search_path = '' as $$
  select exists (
    select 1 from public.admin_users a
    where a.user_id = auth.uid() and a.role in ('owner','admin')
  );
$$;
revoke all on function public.can_manage_services() from public;
grant execute on function public.can_manage_services() to authenticated;

drop policy if exists "services_select_active" on public.services;
create policy "services_select_active" on public.services for select to authenticated
using (is_active or public.can_manage_services());
drop policy if exists "services_admin_insert" on public.services;
create policy "services_admin_insert" on public.services for insert to authenticated
with check (public.can_manage_services());
drop policy if exists "services_admin_update" on public.services;
create policy "services_admin_update" on public.services for update to authenticated
using (public.can_manage_services()) with check (public.can_manage_services());
drop policy if exists "services_admin_delete" on public.services;
