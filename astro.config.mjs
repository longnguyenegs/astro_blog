// @ts-check
import { defineConfig } from "astro/config";
import sitemap, {ChangeFreqEnum} from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-blog-8tb.pages.dev",
  integrations: [
    sitemap({
      changefreq: ChangeFreqEnum.WEEKLY,
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Customize priority and changefreq based on URL patterns
        if (item.url === 'https://astro-blog-8tb.pages.dev/') {
          // Homepage: highest priority, changes weekly
          item.priority = 1.0;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else if (item.url.includes('/posts/')) {
          // Blog posts: high priority, changes monthly
          item.priority = 0.9;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else if (item.url.includes('/blog')) {
          // Blog listing: high priority, changes weekly
          item.priority = 0.8;
          item.changefreq = ChangeFreqEnum.WEEKLY;
        } else if (item.url.includes('/tags/')) {
          // Tag pages: medium priority, changes monthly
          item.priority = 0.6;
          item.changefreq = ChangeFreqEnum.MONTHLY;
        } else {
          // Other pages (about, etc): medium priority, changes yearly
          item.priority = 0.7;
          item.changefreq = ChangeFreqEnum.YEARLY;
        }
        return item;
      },
    }),
  ],

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

  // Prefetch disabled for zero-JS static blog
  prefetch: false,

  compressHTML: true,
});