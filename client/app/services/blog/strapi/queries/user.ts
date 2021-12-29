import { gql } from 'graphql-request';

import { AuthUserAttributes, Collection, ReaderAttributes } from '../models';

export type FindAuthUserVariable = { provider: string; uid: string };
export type FindAuthUserResponse = {
  authUsers: Collection<AuthUserAttributes>;
};
export const findAuthUser = gql`
  query FindAuthUser($provider: String!, $uid: String!) {
    authUsers(
      filters: { provider: { eq: $provider }, uid: { eq: $uid } }
      pagination: { limit: 1 }
    ) {
      data {
        id
      }
    }
  }
`;

export type FindReaderResponse = { readers: Collection<ReaderAttributes> };

export type FindReaderByEmailVariable = { email: string };
export const findReaderbyEmail = gql`
  query FindReaderByEmail($email: String!) {
    readers(filters: { email: { eq: $email } }, pagination: { limit: 1 }) {
      data {
        id
        attributes {
          name
          email
          website
          authUsers {
            data {
              id
              attributes {
                provider
              }
            }
          }
        }
      }
    }
  }
`;
