// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Support dynamic outDir for zero-downtime deployment
  outDir: process.env.ASTRO_OUT_DIR || './dist',

  vite: {
    plugins: [tailwindcss()]
  }
});