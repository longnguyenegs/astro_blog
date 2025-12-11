// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-blog-8tb.pages.dev",
  integrations: [sitemap()],

  build: {
    inlineStylesheets: "auto", // Inline small CSS
  },

  vite: {
    build: {
      minify: "terser", // Aggressive minification
      terserOptions: {
        compress: {
          drop_console: true,
          passes: 2,
        },
      },
      cssCodeSplit: true,
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport", // Prefetch visible links
  },

  compressHTML: true,
});