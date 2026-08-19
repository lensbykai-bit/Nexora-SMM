# Nexora SMM v1.4.0 — Supabase Setup

The connected build uses Supabase for real email/password accounts, profiles, orders, tickets, wallet reads, admin access and the service catalog.

## Fresh project setup

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Run `supabase/admin-v1.3.0.sql`.
4. Run `supabase/services-v1.4.0.sql`.
5. Copy the browser-safe **Project URL** and **Publishable key** into `supabase-config.js`.
6. Register the first account, then deliberately add its user ID to `public.admin_users` as `owner` using a trusted database/admin action.
7. Sign in and open `admin.html`.

## v1.4.0 service permissions

- Authenticated users can read active services.
- `owner` and `admin` roles can create and edit services.
- `support` can view services but cannot modify them.
- Service deletion is disabled; use the Active switch to pause a service instead. This preserves historical order references.

## Security

- Never put a `service_role` key, database password, payment secret, or provider private API key in GitHub Pages or frontend JavaScript.
- Wallet balances remain read-only from the browser.
- Real payment verification and balance changes must use a trusted server or Supabase Edge Function.
- Row Level Security (RLS) protects user and admin data.
