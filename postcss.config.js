module.exports = {
  plugins: [
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('tailwindcss'),
    require('postcss-preset-env')({
      features: {
        'nesting-rules': false,
      },
    }),
  ],
};
