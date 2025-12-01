/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#4A7BA7',
        'ocean-dark': '#3d6585',
        'sky-blue': '#6FA8DC',
        'cloud-grey': '#B4C7D8',
        'horizon': '#D4E3EE',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
