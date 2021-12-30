import { gql } from 'graphql-request';

import { Collection, CommentAttributes, ID } from '../models';

export type CommentsVariable = { articleId: ID };
export type CommentsResponse = { comments: Collection<CommentAttributes> };
export const comments = gql`
  query Comments($articleId: ID!) {
    comments(filters: { article: { id: { eq: $articleId } } }) {
      data {
        id
        attributes {
          content
          article {
            data {
              id
            }
          }
          parent {
            data {
              id
            }
          }
          reader {
            data {
              id
              attributes {
                name
                website
                authUsers {
                  data {
                    attributes {
                      provider
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
