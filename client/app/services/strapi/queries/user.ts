import { gql } from 'graphql-request';

import {
  AuthUserAttributes,
  Collection,
  ID,
  ReaderAttributes,
  Singular,
} from '../models';

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

export type ReaderVariable = { id: ID };
export type ReaderResponse = { reader: Singular<ReaderAttributes> };
export const reader = gql`
  query GetReaderById($id: ID!) {
    reader(id: $id) {
      data {
        id
        attributes {
          uid
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

export type FindReaderResponse = { readers: Collection<ReaderAttributes> };
export type FindReaderByEmailVariable = { email: string };
export const findReaderByEmail = gql`
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
