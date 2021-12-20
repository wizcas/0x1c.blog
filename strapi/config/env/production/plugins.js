module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        endpoint: env('BLOG_SPACES_ENDPOINT'),
        accessKeyId: env('BLOG_SPACES_ACCESS_KEY'),
        secretAccessKey: env('BLOG_SPACES_SECRET_KEY'),
        params: {
          Bucket: env('BLOG_SPACES_BUCKET'),
        },
      },
    },
  },
});
