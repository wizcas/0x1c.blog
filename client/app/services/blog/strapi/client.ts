import { GraphQLClient } from 'graphql-request';

import { getServerUrl } from '~/helpers/url';

const endpoint = getServerUrl('/graphql');
export const gqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  mode: 'cors',
});
