import type { Config } from 'tailwindcss';
// @ts-expect-error - shared preset is a standard JS module
import preset from './design/reference/tailwind.preset.js';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  plugins: [tailwindcssAnimate],
} satisfies Config;
