import { defineConfig } from 'astro/config';
import tina from '@tinacms/astro/integration';

export default defineConfig({
  site: 'https://www.jankelly.de',
  integrations: [tina()],
  output: 'static',
});