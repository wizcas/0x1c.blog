const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

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
    },
    fontFamily: {
      sans: ['Fira Sans', ...fontFamily.sans],
      serif: [...fontFamily.serif],
      mono: ['Fira Code', ...fontFamily.mono],
      thin: ['Fira Sans Condensed', ...fontFamily.sans],
    },
  },
  plugins: [
    /** *** official plugins **** */
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    /** ** Custom plugins *** */
    require('./plugins/codeLangs'),
  ],
};
