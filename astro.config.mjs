// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()],

  // config to allow loading images from astro.build domain, where the image is hosted
  image: {
    domains: ["astro.build", "localhost"],
  },

  env: {
    schema: {
      PUBLIC_HOST: envField.string({
        context: 'client',
        access: 'public',
        url: true,
        default: 'http://localhost:4321',
      })
    },
  }
});
