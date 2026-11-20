import type { Config } from 'tailwindcss';
// @ts-expect-error - shared preset is a standard JS module
import preset from './design/reference/tailwind.preset.js';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  presets: [preset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        streak: {
          '0%': {
            transform: 'translateX(-30%)',
            opacity: '0',
          },
          '40%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        streak: 'streak 1.2s ease-out infinite alternate',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
