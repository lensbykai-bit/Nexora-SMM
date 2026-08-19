-- Nexora SMM v1.3.0 — secure admin console foundation
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('owner','admin','support')),
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
grant select on public.admin_users to authenticated;
drop policy if exists "admin_users_select_self" on public.admin_users;
create policy "admin_users_select_self" on public.admin_users for select to authenticated using ((select auth.uid()) = user_id);
create or replace function public.is_admin() returns boolean language sql stable security invoker set search_path='' as $$ select exists(select 1 from public.admin_users a where a.user_id=auth.uid()); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;
drop policy if exists "profiles_admin_select" on public.profiles;
create policy "profiles_admin_select" on public.profiles for select to authenticated using (public.is_admin());
drop policy if exists "wallets_admin_select" on public.wallets;
create policy "wallets_admin_select" on public.wallets for select to authenticated using (public.is_admin());
drop policy if exists "orders_admin_select" on public.orders;
create policy "orders_admin_select" on public.orders for select to authenticated using (public.is_admin());
drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "tickets_admin_select" on public.tickets;
create policy "tickets_admin_select" on public.tickets for select to authenticated using (public.is_admin());
drop policy if exists "tickets_admin_update" on public.tickets;
create policy "tickets_admin_update" on public.tickets for update to authenticated using (public.is_admin()) with check (public.is_admin());
grant update on public.orders to authenticated;
grant update on public.tickets to authenticated;
