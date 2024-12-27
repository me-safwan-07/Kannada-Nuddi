import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_APP_BASE_URL,
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
