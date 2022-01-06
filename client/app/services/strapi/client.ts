import { GraphQLClient } from 'graphql-request';

import { getServerUrl } from '~/helpers/url';

const endpoint = getServerUrl('/graphql');
export const gqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.SERVER_API_TOKEN}`,
  },
  mode: 'cors',
});
