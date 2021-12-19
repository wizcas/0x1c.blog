module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '34f62ad4ee55c429986d1eca3b5aa253'),
  },
  port: 3090,
});
