const s3envs = ['production'];
module.exports = ({ env }) => {
  const nodeEnv = env('NODE_ENV', 'development');
  const upload = s3envs.includes(nodeEnv)
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
  const providerName = upload?.config.provider || 'local storage';
  console.log(`
================================================
[${nodeEnv}] using ${providerName} for Media Library
================================================
`);
  return {
    upload,
  };
};
