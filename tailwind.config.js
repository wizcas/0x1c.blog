const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      dark: {
        400: '#CCC',
        500: '#999',
        600: '#36494D',
        700: '#273538',
        800: '#243033',
        900: '#1D2729',
      },
      white: 'rgb(var(--white))',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    /***** official plugins *****/
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
