module.exports = ({ env }) => ({
  upload: {
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
  },
});
