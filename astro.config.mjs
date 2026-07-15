import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  compressHTML: true,
  redirects: {
    '/services/cross-platform/': '/technologies/hybrid/',
    '/services/mobile/': '/services/app-development/',
  },
  devToolbar: {
    enabled: false,
  },
  build: {
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
});