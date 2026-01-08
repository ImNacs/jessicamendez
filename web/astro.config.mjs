// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://jessicamendez.bio',

  // Adapter para Actions y endpoints dinámicos
  // En Astro 5, static permite opt-in SSR por página/endpoint
  adapter: node({
    mode: 'standalone',
  }),

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