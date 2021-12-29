import { gql } from 'graphql-request';

import { AuthUserAttributes, ID, ReaderAttributes, Singular } from '../models';

export type CreateAuthUserResponse = {
  createAuthUser: Singular<AuthUserAttributes>;
};
export const createAuthUser = gql`
  mutation CreateAuthUser($data: AuthUserInput!) {
    createAuthUser(data: $data) {
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

export type CreateReaderResponse = { createReader: Singular<ReaderAttributes> };
export const createReader = gql`
  mutation CreateReader($data: ReaderInput!) {
    createReader(data: $data) {
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
export type UpdateReaderResponse = { updateReader: Singular<ReaderAttributes> };
export const updateReader = gql`
  mutation UpdateReader($id: ID!, $data: ReaderInput!) {
    updateReader(id: $id, data: $data) {
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
