# Cashflow Web

Web client for **Cashflow**, a personal finance app: bank accounts,
transactions, tags and monthly budgets. Built as my undergraduate capstone
project (TCC) in Information Systems.

It's a React SPA served as static assets from **Cloudflare Workers**, talking to
[cashflow-api](https://github.com/vineborba/cashflow-api) (Hono + Turso, also
on Workers).

## Stack

- **React 19** with the **React Compiler**, TypeScript, **Vite**
- **Tailwind CSS v4** + `tailwind-variants` for component variants, **Headless UI** for accessible dialogs, listboxes and menus
- **TanStack Query** for server state (one hook per resource in `src/hooks`)
- **React Hook Form** + **Valibot** for forms and validation
- **React Router v7** with lazy-loaded pages and protected routes
- **ky** as the HTTP client, **PostHog** for product analytics and error tracking
- **Wrangler** for deployment

## Features

- Sign-up with email activation, sign-in and protected routes
- Dashboard with account balances and a transactions summary
- Accounts linked to Brazilian banks
- Transactions with tags, filters by period and category, and pagination
- Monthly budgets grouped by tags, with a spending meter for each
- Currency input and formatting in BRL, responsive layout with a drawer menu

## Project structure

```
src/
  pages/        route-level screens (lazy-loaded)
  components/   shared UI plus per-feature folders (accounts, budgets, transactions)
  hooks/        TanStack Query hooks, one per API resource
  services/     typed API calls on top of a single ky client
  contexts/     auth and global loading state
  @types/       domain types
```

## Design notes

- **Auth** relies on the API's `httpOnly` cookie (`credentials: "include"`), so
  no token is ever stored in JavaScript-accessible storage.
- **Errors** from the API are normalised in one place (`services/client`) and
  surfaced to forms and alerts consistently.
- **Performance**: pages are code-split with `React.lazy`, and the React
  Compiler handles memoisation instead of manual `useMemo`/`useCallback`.

## Running locally

Requires Node.js, pnpm and a running [cashflow-api](https://github.com/vineborba/cashflow-api).

```sh
pnpm install
cp .env.example .env   # set VITE_API_URL (and PostHog, optionally)
pnpm dev
```

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the API |
| `VITE_PUBLIC_POSTHOG_KEY`, `VITE_PUBLIC_POSTHOG_HOST` | PostHog project (optional) |

Build with `pnpm build`, deploy with `pnpm deploy`.
