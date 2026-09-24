# TypeScript Starter

pnpm monorepo: React + Vite + TanStack Query + shadcn/ui (`apps/web`), Hono (`apps/api`), shared Zod schemas (`packages/shared`).

Requires Node 26 and pnpm 12. Install with `pnpm install`.

## Architecture

- **api** — Hono on Node (runs `.ts` directly), routes defined with `@hono/zod-openapi`, which validates requests, infers types, and generates the OpenAPI spec; Scalar serves the docs.
- **web** — React SPA built with Vite. Data fetching via TanStack Query, using Hono's typed `hc` client for end-to-end types without codegen. UI from shadcn/ui (Radix + Tailwind). Vite proxies `/api` in dev.
- **shared** — Zod schemas you write by hand here (nothing is generated): one per request/response shape, imported by both apps. TypeScript types come from them via `z.infer`; the web app's API types are inferred from the api code through `hc`.

| Area          | Technologies                                                                       |
| ------------- | ---------------------------------------------------------------------------------- |
| Web           | React, Vite, TanStack Query, shadcn/ui, Tailwind CSS, lucide                       |
| API           | Hono, @hono/zod-openapi, Zod, Scalar                                               |
| Testing (web) | Vitest, Testing Library, jsdom (browser DOM in Node), MSW (mocks `/api` responses) |
| Testing (api) | Vitest, Hono `app.request()` (calls routes without a server)                       |
| Tooling       | pnpm workspaces, TypeScript 7, oxlint (type-aware), oxfmt                          |

| Task             | Command                                                                   |
| ---------------- | ------------------------------------------------------------------------- |
| Dev (watch both) | `pnpm dev` — API on :3000, web on :5173                                   |
| Dev (one app)    | `pnpm dev:api` / `pnpm dev:app`                                           |
| Build            | `pnpm build` — web only; the API runs `.ts` directly                      |
| Start            | `pnpm --filter @starter/api start` / `pnpm --filter @starter/web preview` |
| Test             | `pnpm test`                                                               |
| Test (watch)     | `pnpm --filter @starter/web exec vitest` (or `@starter/api`)              |
| Check            | `pnpm typecheck && pnpm lint && pnpm format:check`                        |

API docs: http://localhost:3000/docs · Adding an endpoint: [docs/adding-an-endpoint.md](docs/adding-an-endpoint.md)

Add a UI component: `cd apps/web && pnpm dlx shadcn@latest add <name>`
