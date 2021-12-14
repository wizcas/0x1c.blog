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

const heightExtensions = {
  hero: '40vh',
  superhero: '80vh',
  ...unitRange(screenUnits, 'vh'),
};
const widthExtensions = {
  ...unitRange(screenUnits, 'vw'),
};

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
      },
      height: heightExtensions,
      minHeight: heightExtensions,
      maxHeight: heightExtensions,
      width: widthExtensions,
      minWidth: widthExtensions,
      maxWidth: widthExtensions,
      typography: {
        DEFAULT: {
          css: {
            h1: { fontSize: '2rem' },
          },
        },
      },
    },
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.stone,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      green: colors.emerald,
      primary: { ...colors.rose, 400: '#EB6D71' },
      accent: colors.emerald,
      hi: {
        primary: '#EB6D71',
        link: '#52D5E0',
        'link-bright': '#A8EAF0',
      },
    },
  },
  plugins: [
    /***** official plugins *****/
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    /**** Custom plugins ****/
    require('./plugins/codeLangs'),
  ],
};
