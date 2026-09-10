import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Port 4173 on purpose: Safari/WebKit refuse 4190 as a restricted network port (blank page).
// The site imports scene modules from ../examples/shared, so three must resolve to a single
// copy (dedupe) and the dev server must be allowed to read one level above the project root.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['three'],
    alias: { '@examples': fileURLToPath(new URL('../examples/shared', import.meta.url)) },
  },
  server: {
    fs: { allow: ['..'] },
    host: '127.0.0.1',
    port: 4173,
    // `pnpm --dir examples dev` (port 4180) so Show 3D iframes resolve under vite dev.
    proxy: {
      '/examples': {
        target: 'http://127.0.0.1:4180',
        rewrite: (p) => p.replace(/^\/examples/, '') || '/',
      },
    },
  },
  build: { target: 'es2022' },
});
