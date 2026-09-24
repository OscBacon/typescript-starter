# TypeScript Starter

pnpm monorepo: React + Vite + TanStack Query + shadcn/ui (`apps/web`), Hono (`apps/api`), shared Zod schemas (`packages/shared`).

Requires Node 26 and pnpm 12. Install with `pnpm install`.

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
