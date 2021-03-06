module.exports = {
  plugins: [
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('postcss-preset-env')({
      features: {
        'nesting-rules': false,
        'color-functional-notation': true,
        'custom-selectors': true,
      },
    }),
    require('postcss-extend-rule'),
  ],
};
