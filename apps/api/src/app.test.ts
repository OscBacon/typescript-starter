import { describe, expect, it } from 'vitest';
import { app } from './app.ts';

describe('GET /api/hello', () => {
  it('returns a hello message', async () => {
    const res = await app.request('/api/hello');

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: 'Hello from the API' });
  });
});
