import tailwindCSSAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.jsx'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        royalblue: '#4169E1',
      },
    },
  },
  plugins: [tailwindCSSAnimate],
};
