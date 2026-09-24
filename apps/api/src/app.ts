import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { HelloSchema } from '@starter/shared';

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

// Chain routes so AppType carries every route's types for the hc client.
const routes = app.openapi(helloRoute, (c) => c.json({ message: 'Hello from the API' }, 200));

app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: { title: 'Starter API', version: '1.0.0' },
});
app.get('/docs', Scalar({ url: '/openapi.json' }));

export type AppType = typeof routes;
