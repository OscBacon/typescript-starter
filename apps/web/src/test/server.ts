import type { InferResponseType } from 'hono/client';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import type { client } from '../api.ts';

// Type mocks from the route (not the shared schema) so they break when the API response changes.
type HelloResponse = InferResponseType<typeof client.api.hello.$get, 200>;

export const handlers = [
  http.get('*/api/hello', () => HttpResponse.json<HelloResponse>({ message: 'Hello from MSW' })),
];

export const server = setupServer(...handlers);
