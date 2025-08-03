import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    appDir: 'app',
    paths: {
      base: '/articles-editor-example'
    },
    prerender: {
      origin: 'https://pikil.github.io'
    },
    adapter: adapter({
      fallback: 'index.html',
      precompress: true
    }),
    alias: {
      $data: 'src/lib/data',
      $themes: 'src/themes',
      $components: 'src/components'
    }
  },
  preprocess: vitePreprocess()
};

export default config;
