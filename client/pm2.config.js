module.exports = {
  apps: [
    {
      name: 'Remix',
      script: 'PORT=3070 npm run dev:remix',
      ignore_watch: ['.'],
    },
    {
      name: 'TailwindCSS',
      script: 'npm run dev:css',
      watch: ['postcss.config.js'],
    },
  ],
};
