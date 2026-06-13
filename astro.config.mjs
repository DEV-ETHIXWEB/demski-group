import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  redirects: {
    '/services/cross-platform/': '/technologies/hybrid/',
    '/services/mobile/': '/services/app-development/',
  },
  devToolbar: {
    enabled: false,
  },
});