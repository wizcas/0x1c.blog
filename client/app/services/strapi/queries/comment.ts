import { gql } from 'graphql-request';

import { Collection, CommentAttributes, ID } from '../models';

export type CommentsVariable = { articleId: ID };
export type CommentsResponse = { comments: Collection<CommentAttributes> };
export const comments = gql`
  query Comments($articleId: ID!) {
    comments(
      filters: { article: { id: { eq: $articleId } } }
      sort: ["createdAt:desc"]
    ) {
      data {
        id
        attributes {
          markdown
          text
          createdAt
          updatedAt
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
