# Nexora SMM — Pink Luxe v1.3.0

Nexora SMM is a bilingual Khmer/English dashboard theme with Supabase authentication, persistent user data, and a secure admin console foundation.

## Current release
- Version: `1.3.0`
- Supabase email/password authentication
- Profiles and read-only wallet balance
- User order requests and support tickets
- Secure `admin_users` role table
- Admin-only overview, users, orders and tickets pages
- Admin order/ticket status management protected by Row Level Security (RLS)
- Pink Luxe responsive Admin Console at `admin.html`

## Admin access
`admin.html` checks the signed-in account using the database `is_admin()` function. A normal user cannot become an admin from the browser. After the owner account is registered, its Supabase user ID must be deliberately added to `public.admin_users` by a trusted database/admin action.

## First-time login note
Old Demo accounts are not automatically migrated into Supabase Auth. A user coming from the old Demo flow must use `register.html` once to create a real Supabase account, confirm the email if requested, then use `login.html`.

## Important security notes
Only the Supabase **publishable key** belongs in `supabase-config.js`. Never commit a `service_role` key, database password, payment secret, or other private credential to a public repository.

Wallet balance changes, payment verification and other privileged financial operations must be performed by a trusted server or Supabase Edge Function. The Admin Console can read wallet balances but cannot modify them.

## Files
- `index.html` — user dashboard
- `login.html` / `register.html` — authentication UI
- `admin.html` / `admin.css` / `admin.js` — secure Admin Console
- `style.css` / `auth.css` — Pink Luxe theme
- `script.js` — user dashboard behavior
- `auth.js` — authentication flow
- `backend.js` — Supabase data layer
- `supabase-config.js` — public Supabase browser config
- `supabase/schema.sql` — base tables, RLS and signup trigger
- `supabase/admin-v1.3.0.sql` — admin roles and admin RLS policies
- `SUPABASE_SETUP.md` — setup notes
- `VERSION` — release number
