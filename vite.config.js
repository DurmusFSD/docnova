import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200, // 👈 Buraya bu satırı ekle
    proxy: {
      '/api': {
        target: 'https://api-dev.docnova.ai',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
