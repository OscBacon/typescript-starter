import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// Under portless, point the web app at the API's portless URL (includes the worktree prefix).
const apiUrl =
  process.env.VITE_API_URL ??
  (process.env.PORTLESS_URL
    ? execFileSync('portless', ['get', 'api.starter'], { encoding: 'utf8' }).trim()
    : undefined);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: apiUrl ? { 'import.meta.env.VITE_API_URL': JSON.stringify(apiUrl) } : {},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
