# Nexora SMM v1.2.0 — Supabase Setup

This version can run in two modes:

- **Demo mode:** works immediately using browser localStorage.
- **Supabase mode:** real email/password accounts plus persistent profiles, order requests, tickets and read-only wallet data.

## Setup

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. In your Supabase project settings, copy the **Project URL** and the browser-safe **Publishable key**.
4. Edit `supabase-config.js`:

```js
window.NEXORA_SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_REF.supabase.co',
  publishableKey: 'YOUR_SUPABASE_PUBLISHABLE_KEY'
};
```

5. Reload `register.html` and create an account.

## Security

- Never put a `service_role` key, database password, payment secret, or provider private API key in GitHub Pages or frontend JavaScript.
- Wallet balances are read-only from the browser in this schema.
- Real payment verification, balance updates and privileged order processing must be done by a secure server or Supabase Edge Function in a later version.
- Row Level Security (RLS) is enabled so authenticated users can access only their own rows.
