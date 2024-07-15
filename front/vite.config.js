import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  clearScreen: false,
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://api:3000/',
      "/socket.io": {
        ws: true,
        target: 'http://api:3000/'
      }
    },
  },
});
