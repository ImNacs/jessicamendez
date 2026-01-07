// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://jessicamendez.bio',

  // Markdown/MDX configuration
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-MX' }
      }
    }),
  ],

  // Support dynamic outDir for zero-downtime deployment
  outDir: process.env.ASTRO_OUT_DIR || './dist',

  // Prefetch for faster navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  },

  vite: {
    plugins: [tailwindcss()]
  }
});