import type { AppType } from '@starter/api/app';
import { queryOptions } from '@tanstack/react-query';
import { hc } from 'hono/client';

export const client = hc<AppType>(location.origin);

export const helloOptions = () =>
  queryOptions({
    queryKey: ['hello'],
    queryFn: async () => {
      const res = await client.api.hello.$get();
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    },
  });
