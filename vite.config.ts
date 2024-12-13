import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/geodezja-website/',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
});
