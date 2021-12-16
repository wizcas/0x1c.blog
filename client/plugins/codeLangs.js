const plugin = require('tailwindcss/plugin');
const langs = require('../configs/codeLangs');

const langClasses = Object.keys(langs).reduce((acc, key) => {
  const cls = `.lang-hint[data-lang=${key}]`;
  acc[cls] = langs[key];
  return acc;
}, {});

module.exports = plugin(function ({ addComponents }) {
  addComponents(langClasses);
});
