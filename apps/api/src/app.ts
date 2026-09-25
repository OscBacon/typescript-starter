import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { HelloSchema } from '@starter/shared';
import { env } from 'hono/adapter';
import { cors } from 'hono/cors';

const helloRoute = createRoute({
  method: 'get',
  path: '/api/hello',
  responses: {
    200: {
      content: { 'application/json': { schema: HelloSchema } },
      description: 'A hello world message',
    },
  },
});

export const app = new OpenAPIHono();

// localhost and *.localhost (portless) in development; WEB_ORIGIN, a comma-separated allowlist, always.
const LOCAL_ORIGIN = /^https?:\/\/(?:[a-z0-9-]+\.)*localhost(?::\d+)?$/;

app.use(
  '/api/*',
  cors({
    origin: (origin, c) => {
      const { NODE_ENV, WEB_ORIGIN = '' } = env<{ NODE_ENV?: string; WEB_ORIGIN?: string }>(c);
      if (NODE_ENV !== 'production' && LOCAL_ORIGIN.test(origin)) return origin;
      return WEB_ORIGIN.split(',').includes(origin) ? origin : null;
    },
  }),
);

// Chain routes so AppType carries every route's types for the hc client.
const routes = app.openapi(helloRoute, (c) => c.json({ message: 'Hello from the API' }, 200));

app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: { title: 'Starter API', version: '1.0.0' },
});
app.get('/docs', Scalar({ url: '/openapi.json' }));

export type AppType = typeof routes;
