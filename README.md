# TypeScript Starter

pnpm monorepo: React + Vite + TanStack Query + shadcn/ui (`apps/web`), Hono (`apps/api`), shared Zod schemas (`packages/shared`).

Requires Node 26 and pnpm 12. Install with `pnpm install`.

## Using this template

Create a project with **Use this template** on GitHub, or `gh repo create my-app --template OscBacon/typescript-starter --private --clone`. Then rename:

- Package scope: `git grep -l '@starter/' | xargs sed -i 's#@starter/#@my-app/#g' && pnpm install`
- Root `name` in `package.json`, the `<title>` in `apps/web/index.html`, the header text in `apps/web/src/components/site-header.tsx`, the OpenAPI title in `apps/api/src/app.ts`, and the portless names (`ui.starter`, `api.starter`) in the apps' `package.json` and `apps/web/vite.config.ts`

## Architecture

- **api** — Hono on Node (runs `.ts` directly), routes defined with `@hono/zod-openapi`, which validates requests, infers types, and generates the OpenAPI spec; Scalar serves the docs.
- **web** — React SPA built with Vite. Data fetching via TanStack Query, using Hono's typed `hc` client for end-to-end types without codegen. UI from shadcn/ui (Radix + Tailwind).
- **shared** — Zod schemas you write by hand here (nothing is generated): one per request/response shape, imported by both apps. TypeScript types come from them via `z.infer`; the web app's API types are inferred from the api code through `hc`.

| Area          | Technologies                                                                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web           | React, Vite, TanStack Query, shadcn/ui, Tailwind CSS, lucide                                                                                                                             |
| API           | Hono, @hono/zod-openapi, Zod, Scalar                                                                                                                                                     |
| Testing (web) | Vitest, Testing Library, jsdom (browser DOM in Node), MSW (fakes `/api` responses so component tests run the real query code without the API; handlers in `apps/web/src/test/server.ts`) |
| Testing (api) | Vitest, Hono `app.request()` (calls routes without a server)                                                                                                                             |
| Tooling       | pnpm workspaces, TypeScript 7, oxlint (type-aware), oxfmt                                                                                                                                |

| Task             | Command                                                                                |
| ---------------- | -------------------------------------------------------------------------------------- |
| Dev (watch both) | `pnpm dev` — web at https://ui.starter.localhost, API at https://api.starter.localhost |
| Dev (one app)    | `pnpm dev:api` / `pnpm dev:web`                                                        |
| Build            | `pnpm build` — web only; the API runs `.ts` directly                                   |
| Start            | `pnpm --filter @starter/api start` / `pnpm --filter @starter/web preview`              |
| Test             | `pnpm test`                                                                            |
| Test (watch)     | `pnpm --filter @starter/web exec vitest` (or `@starter/api`)                           |
| Check            | `pnpm typecheck && pnpm lint && pnpm format:check`                                     |

API docs: https://api.starter.localhost/docs · Adding an endpoint: [docs/adding-an-endpoint.md](docs/adding-an-endpoint.md)

Dev servers run through [portless](https://portless.sh) (first run asks for `sudo` to trust a local CA and bind :443). In a git worktree, URLs get the branch as a prefix (`https://<branch>.ui.starter.localhost`). `PORTLESS=0 pnpm dev` skips it: API on :3000, web on :5173.

The web app calls the API at `VITE_API_URL` (dev: portless URL, or `http://localhost:3000`; set it for production builds). In production the API only allows origins in `WEB_ORIGIN`. See each app's `.env.example`.

Add a UI component: `cd apps/web && pnpm dlx shadcn@latest add <name>`
