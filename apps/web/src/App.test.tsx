import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { App } from './App.tsx';
import { server } from './test/server.ts';

function renderApp() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}

describe('App', () => {
  it('shows the message from the API', async () => {
    renderApp();

    expect(await screen.findByText('Hello from MSW')).toBeInTheDocument();
  });

  it('shows the status when the API returns an error', async () => {
    server.use(http.get('*/api/hello', () => new HttpResponse(null, { status: 500 })));
    renderApp();

    expect(await screen.findByText('API request failed with status 500.')).toBeInTheDocument();
  });

  it('says the API is unreachable when the request fails', async () => {
    server.use(http.get('*/api/hello', () => HttpResponse.error()));
    renderApp();

    expect(
      await screen.findByText(/Could not reach the API at .*\. Is it running\?/),
    ).toBeInTheDocument();
  });
});
