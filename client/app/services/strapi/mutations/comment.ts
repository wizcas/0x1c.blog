import { gql } from 'graphql-request';

import { ID, Singular } from '../models';
import { CommentAttributes } from '../models/comment';

export interface CommentInput {
  content: string;
  article: ID;
  reader: ID;
  parent?: ID;
}
export type PostCommentVariable = {
  data: CommentInput;
};
export type PostCommentResponse = {
  comment: Singular<CommentAttributes>;
};
export const postComment = gql`
  mutation PostComment($data: CommentInput!) {
    comment: createComment(data: $data) {
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
