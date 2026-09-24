import type { Hello } from '@starter/shared';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export const handlers = [
  http.get('*/api/hello', () => HttpResponse.json<Hello>({ message: 'Hello from MSW' })),
];

export const server = setupServer(...handlers);
