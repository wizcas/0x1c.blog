import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3080/graphql';
export const gqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  mode: 'cors',
});
