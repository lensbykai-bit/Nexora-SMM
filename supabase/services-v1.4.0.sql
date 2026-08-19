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

insert into public.services
(id,category,platform,price,min_quantity,max_quantity,name_km,name_en,time_km,time_en,start_km,start_en,speed_km,speed_en,details_km,details_en,is_active,sort_order)
values
('content-calendar','content','all',12,1,20,'ផែនការមាតិកាប្រចាំខែ','Monthly Content Calendar','1–2 ថ្ងៃ','1–2 days','ក្នុង 1 ថ្ងៃធ្វើការ','Within 1 business day','ផែនការ 30 ថ្ងៃ','30-day plan','ផែនការមាតិកា 30 ថ្ងៃ សម្រាប់ Page ឬ Brand។','A 30-day content planning package for a page or brand.',true,10),
('short-video','content','tiktok',9,1,50,'ផែនការវីដេអូខ្លី TikTok','TikTok Short-form Content Plan','1–2 ថ្ងៃ','1–2 days','ក្នុង 1 ថ្ងៃធ្វើការ','Within 1 business day','10 វីដេអូ / កញ្ចប់','10-video plan','គំនិតវីដេអូខ្លី, Hook, Caption និង Posting Structure។','Short-form ideas, hooks, captions and posting structure.',true,20),
('meta-ads','ads','facebook',18,1,10,'ពិនិត្យ Meta Ads Campaign','Meta Ads Campaign Review','2–3 ថ្ងៃ','2–3 days','ក្នុង 1 ថ្ងៃធ្វើការ','Within 1 business day','ក្នុងមួយ Campaign','Per campaign','ពិនិត្យ Campaign Structure, Targeting, Creative និង Measurement Plan។','Review campaign structure, targeting, creative organization and measurement planning.',true,30),
('youtube-seo','analytics','youtube',15,1,10,'ពិនិត្យ SEO ឆានែល YouTube','YouTube Channel SEO Audit','2 ថ្ងៃ','2 days','ក្នុង 1 ថ្ងៃធ្វើការ','Within 1 business day','ក្នុងមួយឆានែល','Per channel','ពិនិត្យ Title, Description, Thumbnail និង Discoverability។','Audit titles, descriptions, thumbnails and discoverability.',true,40),
('community','community','all',14,1,12,'ផែនការគ្រប់គ្រង Community','Community Management Plan','1–2 ថ្ងៃ','1–2 days','ក្នុង 1 ថ្ងៃធ្វើការ','Within 1 business day','ផែនការប្រចាំសប្ដាហ៍','Weekly plan','ផែនការឆ្លើយតប Comment, FAQ និង Moderation។','A response, FAQ and moderation framework.',true,50),
('ig-captions','content','instagram',10,1,50,'កញ្ចប់ Caption Instagram','Instagram Caption Pack','1–2 ថ្ងៃ','1–2 days','ក្នុង 1 ថ្ងៃធ្វើការ','Within 1 business day','10 Posts / កញ្ចប់','10-post pack','Caption និងគំនិតមាតិកាសម្រាប់ Instagram Page ឬ Brand។','Captions and content angles for an Instagram page or brand.',true,60),
('telegram-plan','analytics','telegram',11,1,20,'ផែនការ Telegram Channel','Telegram Channel Strategy','2 ថ្ងៃ','2 days','ក្នុង 1 ថ្ងៃធ្វើការ','Within 1 business day','Strategy Report','Strategy report','Content, retention និង cross-promotion strategy។','Content, retention and cross-promotion strategy.',true,70),
('traffic-audit','analytics','website',16,1,20,'Website Social Traffic Audit','Website Social Traffic Audit','2–3 ថ្ងៃ','2–3 days','ក្នុង 1 ថ្ងៃធ្វើការ','Within 1 business day','Audit Report','Audit report','ពិនិត្យ Social-to-Website Funnel និង Tracking Setup។','Audit the social-to-website funnel and tracking setup.',true,80)
on conflict (id) do nothing;
