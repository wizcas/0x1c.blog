module.exports = ({ env }) => {
  const uploadOrigin = `${env('DO_SPACES_BUCKET')}.${env(
    'DO_SPACES_ENDPOINT'
  )}`;
  return [
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': ["'self'", 'data:', 'blob:', uploadOrigin],
            'media-src': ["'self'", 'data:', 'blob:', uploadOrigin],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    'strapi::cors',
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::favicon',
    'strapi::public',
  ];
};
