module.exports = ({ env }) => {
  const nodeEnv = env('NODE_ENV', 'development');
  const upload =
    nodeEnv === 'production'
      ? {
          config: {
            provider: 'aws-s3',
            providerOptions: {
              endpoint: env('DO_SPACES_ENDPOINT'),
              accessKeyId: env('DO_SPACES_ACCESS_KEY'),
              secretAccessKey: env('DO_SPACES_SECRET_KEY'),
              params: {
                Bucket: env('DO_SPACES_BUCKET'),
              },
            },
          },
        }
      : undefined;
  console.log('ENV', {
    nodeEnv,
    endpoint: env('DO_SPACES_ENDPOINT'),
    accessKeyId: env('DO_SPACES_ACCESS_KEY'),
    secretAccessKey: env('DO_SPACES_SECRET_KEY'),
    params: {
      Bucket: env('DO_SPACES_BUCKET'),
    },
  });
  return {
    upload,
  };
};
