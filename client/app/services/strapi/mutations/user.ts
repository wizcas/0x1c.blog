import { gql } from 'graphql-request';

import { AuthUserAttributes, ID, ReaderAttributes, Singular } from '../models';

export type CreateAuthUserVariable = {
  data: AuthUserAttributes;
};
export type CreateAuthUserResponse = {
  authUser: Singular<AuthUserAttributes>;
};
export const createAuthUser = gql`
  mutation CreateAuthUser($data: AuthUserInput!) {
    authUser: createAuthUser(data: $data) {
      data {
        id
        attributes {
          provider
          uid
          username
        }
      }
    }
  }
`;

export type ReaderInput = Omit<ReaderAttributes, 'authUsers'> & {
  authUsers?: ID[];
};

export type CreateReaderVariable = { data: ReaderInput };
export type CreateReaderResponse = { reader: Singular<ReaderAttributes> };
export const createReader = gql`
  mutation CreateReader($data: ReaderInput!) {
    reader: createReader(data: $data) {
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
                uid
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateReaderVariable = { id: ID; data: ReaderInput };
export type UpdateReaderResponse = { reader: Singular<ReaderAttributes> };
export const updateReader = gql`
  mutation UpdateReader($id: ID!, $data: ReaderInput!) {
    reader: updateReader(id: $id, data: $data) {
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
