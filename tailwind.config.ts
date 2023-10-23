import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      blue: '#0064D1',
      yellow: '#DDBEA9',
      red: '#FF5700',
      white: '#FFFFFF',
      black: '#000000',
      dark: '#212529',
      gray: '#C4C4C4',
      'light-dark': '#495057',
      transparent: 'transparent',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-josefin-sans)'],
        work: ['var(--font-josefin-sans)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
