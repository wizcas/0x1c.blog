module.exports = {
  apps: [
    {
      name: 'Remix',
      script: 'npm run dev:remix',
      ignore_watch: ['.'],
    },
    {
      name: 'TailwindCSS',
      script: 'npm run dev:css',
      watch: ['postcss.config.js'],
    },
  ],
};
