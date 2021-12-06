module.exports = {
  apps: [
    {
      name: 'Remix',
      script: 'remix dev',
      ignore_watch: ['.'],
    },
    {
      name: 'TailwindCSS',
      script: 'npm run dev:css',
      watch: ['postcss.config.js'],
    },
  ],
};
