import { afterEach, describe, expect, it, vi } from 'vitest';
import { app } from './app.ts';

describe('GET /api/hello', () => {
  it('returns a hello message', async () => {
    const res = await app.request('/api/hello');

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: 'Hello from the API' });
  });
});

const allowedOrigin = async (origin: string) =>
  (await app.request('/api/hello', { headers: { Origin: origin } })).headers.get(
    'Access-Control-Allow-Origin',
  );

describe('CORS', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('allows localhost and portless origins in development', async () => {
    expect(await allowedOrigin('http://localhost:5173')).toBe('http://localhost:5173');
    expect(await allowedOrigin('https://fix-x.ui.starter.localhost')).toBe(
      'https://fix-x.ui.starter.localhost',
    );
  });

  it('rejects other origins', async () => {
    expect(await allowedOrigin('https://evil.example')).toBeNull();
    expect(await allowedOrigin('https://localhost.evil.example')).toBeNull();
  });

  it('only allows WEB_ORIGIN in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('WEB_ORIGIN', 'https://app.example.com');

    expect(await allowedOrigin('https://app.example.com')).toBe('https://app.example.com');
    expect(await allowedOrigin('http://localhost:5173')).toBeNull();
  });
});
