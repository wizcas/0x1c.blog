const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  const config = parse(
    env('BLOG_DATABASE_URL', 'postgres://postgres:postgres@localhost:5432/blog')
  );
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: {
          rejectUnauthorized: false,
        },
      },
    },
  };
};
