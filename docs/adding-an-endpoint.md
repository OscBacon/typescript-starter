# Adding an API endpoint

1. **Schema** — add a Zod schema to `packages/shared/src/index.ts`.
2. **Route** — in `apps/api/src/app.ts`, define it with `createRoute` and **chain** it onto `routes` (`.openapi(newRoute, handler)`), or the frontend loses its types.
3. **Test** — add a case in `apps/api/src/app.test.ts` using `app.request(...)`.
4. **Query** — add a `queryOptions` wrapper in `apps/web/src/api.ts` that calls `client.api...`.
5. **Use** — `useQuery(yourOptions())` in a component; mock it with MSW in `apps/web/src/test/server.ts`, typing the response with `InferResponseType<typeof client.api...$get, 200>`.

Check: `pnpm typecheck && pnpm test`. Docs update automatically at `/docs`.
