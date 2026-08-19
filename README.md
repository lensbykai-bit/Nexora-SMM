# Nexora SMM — Pink Luxe v1.2.1

Nexora SMM is a bilingual Khmer/English dashboard theme with Supabase authentication and persistent user data.

## Current release
- Version: `1.2.1`
- Login hotfix for first-time Supabase users
- Clear bilingual messages for invalid credentials and unconfirmed email
- Supabase project connected with public browser configuration
- Email/password authentication
- Profiles
- Read-only wallet balance in browser
- User order requests
- Support tickets
- Row Level Security (RLS)

## First-time login note
Old Demo accounts are not automatically migrated into Supabase Auth. A user coming from the old Demo flow must use `register.html` once to create a real Supabase account, confirm the email if requested, then use `login.html`.

## Important security notes
Only the Supabase **publishable key** belongs in `supabase-config.js`. Never commit a `service_role` key, database password, payment secret, or other private credential to a public repository.

Wallet balance changes, payment verification, final prices, and privileged order status changes must be performed by a trusted server or Supabase Edge Function in a later release.

## Files
- `index.html` — dashboard
- `login.html` / `register.html` — authentication UI
- `style.css` / `auth.css` — Pink Luxe theme
- `script.js` — dashboard behavior
- `auth.js` — auth flow
- `backend.js` — Supabase data layer
- `supabase-config.js` — public Supabase browser config
- `supabase/schema.sql` — tables, RLS and signup trigger
- `SUPABASE_SETUP.md` — setup notes
- `VERSION` — release number
