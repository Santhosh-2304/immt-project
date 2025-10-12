// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // bind to IPv4 — keeps hostname consistent
    port: 5173,
    proxy: {
      // forward any /api request to your backend
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path // keep /api prefix
      }
    }
  }
});
