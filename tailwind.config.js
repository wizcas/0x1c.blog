const colors = require('tailwindcss/colors');

const screenUnits = new Array(10).fill(0).map((_, i) => (i + 1) * 10);

function unitRange(values, unit) {
  const getName = (v) => `${v}${unit}`;
  return values.reduce((values, v) => {
    const n = getName(v);
    values[n] = n;
    return values;
  }, {});
}

const heightExtension = {
  hero: '40vh',
  superhero: '80vh',
  ...unitRange(screenUnits, 'vh'),
};

module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      },
      height: heightExtension,
      minHeight: heightExtension,
      maxHeight: heightExtension,
    },
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
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
