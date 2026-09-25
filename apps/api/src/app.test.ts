import { describe, expect, it } from 'vitest';
import { app } from './app.ts';

describe('GET /api/hello', () => {
  it('returns a hello message', async () => {
    const res = await app.request('/api/hello');

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: 'Hello from the API' });
  });
});

describe('CORS', () => {
  it('allows the web origin', async () => {
    const res = await app.request('/api/hello', { headers: { Origin: 'http://localhost:5173' } });

    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:5173');
  });

  it('rejects other origins', async () => {
    const res = await app.request('/api/hello', { headers: { Origin: 'https://evil.example' } });

    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });
});
