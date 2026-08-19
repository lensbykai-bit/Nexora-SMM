# Nexora SMM — Pink Luxe v1.4.0

Nexora SMM is a bilingual Khmer/English dashboard with Supabase authentication, persistent user data, a protected Admin Console, and a database-backed service catalog.

## Current release
- Version: `1.4.0`
- Supabase email/password authentication
- Profiles and read-only wallet balance
- User order requests and support tickets
- Secure `admin_users` role table
- Admin overview, users, services, orders and tickets
- User search and activity filters
- Database-backed service catalog
- Owner/Admin service create, edit, activate and pause controls
- Service deletion is intentionally disabled to preserve history
- Admin order/ticket status management protected by Row Level Security (RLS)
- Pink Luxe responsive Admin Console at `admin.html`

## Service catalog
The user dashboard now loads active services from `public.services`. If the database query is temporarily unavailable, the front end keeps a small legitimate-marketing fallback catalog so the interface remains usable.

Service changes are protected by the `can_manage_services()` database check. Only accounts with `owner` or `admin` in `public.admin_users` can create or edit services. A `support` account can view the catalog but cannot modify it.

## Admin access
`admin.html` checks the currently signed-in Supabase account against `public.admin_users`. A normal browser user cannot make themselves an admin. Admin permissions are controlled in the database, not in LocalStorage.

## First-time login note
Old Demo accounts are not automatically migrated into Supabase Auth. A user coming from the old Demo flow must use `register.html` once to create a real Supabase account, confirm the email if requested, then use `login.html`.

## Important security notes
Only the Supabase **publishable key** belongs in `supabase-config.js`. Never commit a `service_role` key, database password, payment secret, or other private credential to a public repository.

Wallet balance changes, payment verification and other privileged financial operations must be performed by a trusted server or Supabase Edge Function. The Admin Console can read wallet balances but cannot modify them.

## Files
- `index.html` — user dashboard
- `login.html` / `register.html` — authentication UI
- `admin.html` / `admin.css` / `admin.js` — Admin Console
- `style.css` / `auth.css` — Pink Luxe theme
- `script.js` — user dashboard behavior and database service catalog
- `auth.js` — authentication flow
- `backend.js` — Supabase data layer
- `supabase-config.js` — public Supabase browser config
- `supabase/schema.sql` — base tables, RLS and signup trigger
- `supabase/admin-v1.3.0.sql` — admin roles and admin RLS policies
- `supabase/services-v1.4.0.sql` — dynamic service catalog and service-management policies
- `SUPABASE_SETUP.md` — setup notes
- `VERSION` — release number
