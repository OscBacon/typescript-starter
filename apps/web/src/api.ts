import type { AppType } from '@starter/api/app';
import { queryOptions } from '@tanstack/react-query';
import { hc } from 'hono/client';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

// Turn network failures (API down, CORS rejection) into a clear error for every endpoint.
const apiFetch: typeof fetch = async (input, init) => {
  try {
    return await fetch(input, init);
  } catch (cause) {
    if (init?.signal?.aborted) throw cause;
    throw new Error(`Could not reach the API at ${API_URL}. Is it running?`, { cause });
  }
};

export const client = hc<AppType>(API_URL, { fetch: apiFetch });

export const helloOptions = () =>
  queryOptions({
    queryKey: ['hello'],
    queryFn: async () => {
      const res = await client.api.hello.$get();
      if (!res.ok) throw new Error(`API request failed with status ${res.status}.`);
      return res.json();
    },
  });
