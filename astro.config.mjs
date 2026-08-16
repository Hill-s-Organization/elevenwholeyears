// @ts-check
import { defineConfig, envField } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: { build: 'compile', runtime: 'passthrough' }
  }),
  env: {
    schema: {
      TWY_API_URL: envField.string({ context: "server", access: "public", default: "https://api.recroom.baby" }),
      TWY_CDN_URL: envField.string({ context: "server", access: "public", default: "https://cdn.recroom.baby" })
    }
  }
});
