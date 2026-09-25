# CLAUDE.md

## Verify changes

`pnpm typecheck && pnpm lint && pnpm test && pnpm build && pnpm format:check`

## Dev servers

- The user usually has `pnpm dev` running. Never `pkill -f` dev processes. For live checks use other ports
  (`PORT=3100 WEB_ORIGIN=http://localhost:5273`, `VITE_API_URL=http://localhost:3100 vite --port 5273 --strictPort`)
  and stop only the PIDs you started.

## TypeScript 7

- The `typescript` package no longer exposes the compiler API, so tools that use it crash
  (e.g. @hey-api/openapi-ts, openapi-typescript). Check before adding one.
- `types` defaults to `[]`: list global types per tsconfig. `baseUrl` is removed.
- The API runs `.ts` directly on Node 26: use `.ts` import extensions, and no enums or parameter
  properties (`erasableSyntaxOnly`).

## Hono

- Chain routes onto `routes` in `apps/api/src/app.ts`, or `hc` types in the web app become `unknown`.

## pnpm

- Quote workspace specs in zsh: `pnpm add '@starter/shared@workspace:*'`.
- pnpm 12 holds back releases less than about a day old. Don't override this to get "latest".

## shadcn

- Run the CLI from `apps/web`, then `pnpm format` (it writes double quotes).
- The `cn` dependency is shadcn's official package (replaces clsx + tailwind-merge). Keep it.
