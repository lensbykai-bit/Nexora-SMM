# Changelog

## v1.4.0 — User Filters + Service Management — 2026-08-20
- Added database-backed `services` catalog.
- Seeded the existing legitimate marketing services into Supabase.
- User dashboard now loads active services from Supabase with a safe fallback catalog.
- Added Admin Console service management page.
- Owner/Admin can create, edit, activate and pause services.
- Service deletion is disabled to preserve historical order references.
- Added user search and activity filters for orders, tickets and positive wallet balance.
- Added service search and active/paused filters.
- Added Admin Console shortcut for authorized accounts in the user dashboard.
- Improved output escaping for saved links, ticket text and admin tables.
- Updated dashboard/auth/admin release labels to v1.4.0.
- Applied the v1.4.0 service migrations to the connected Supabase project.

## v1.3.0 — Admin Console Foundation — 2026-08-20
- Added `admin.html`, `admin.css` and `admin.js` with the Pink Luxe admin design.
- Added secure `admin_users` role table and `is_admin()` access check.
- Added RLS policies allowing admins to view profiles, wallets, orders and tickets.
- Added admin-only order status and ticket status management.
- Wallet balances remain read-only in the browser/admin console.
- Added `supabase/admin-v1.3.0.sql` migration reference.
- Applied the admin migration to the connected Supabase project.

## v1.2.1 — Login Hotfix — 2026-08-20
- Diagnosed Supabase sign-in failures caused by accounts not yet existing in Supabase Auth.
- Added clear bilingual messages for invalid credentials, unconfirmed email, existing account and disabled signup errors.
- Added first-time migration guidance: old Demo accounts must register once in Supabase.
- Updated Login/Register release labels to v1.2.1.

## v1.2.0 — Supabase Ready — 2026-08-20
- Added Supabase Auth integration with Demo fallback.
- Added `backend.js` abstraction and `supabase-config.js`.
- Added database schema for profiles, wallets, wallet transactions, order requests and tickets.
- Added Row Level Security policies so users can access only their own rows.
- Added automatic profile/wallet creation on signup.
- Dashboard can load profile, orders, tickets and wallet data from Supabase.
- Real-mode order requests and tickets can be saved to the database.
- Wallet remains read-only from the browser; payment processing is not connected.
- Updated Login/Register and dashboard labels to v1.2.0.

## v1.1.0 — Pink Luxe UX — 2026-08-20
- Added version system.
- Added notifications, favorites, fund history and recent activity.
- Improved responsive UI and profile menu.

## v1.0.0 — Pink Luxe Base — 2026-08-20
- Initial Pink Luxe theme.
- Khmer + English UI.
- Demo account flow and dashboard foundation.
