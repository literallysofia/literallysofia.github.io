import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://literallysofia.github.io',
  // Astro 7 defaults to 'jsx', which drops the space between inline tags
  // (e.g. "Calendar <em>meets inbox</em>"); keep the classic behaviour
  compressHTML: true,
});
