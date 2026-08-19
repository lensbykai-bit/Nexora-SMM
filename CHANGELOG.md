# Changelog

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
