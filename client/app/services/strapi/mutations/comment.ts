import { gql } from 'graphql-request';

import { ID, Singular } from '../models';
import { CommentAttributes } from '../models/comment';

export interface CommentInput {
  markdown: string;
  text: string;
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
          markdown
          article {
            data {
              id
            }
          }
          parent {
            data {
              id
              attributes {
                markdown
                text
                createdAt
                updatedAt
                reader {
                  data {
                    id
                    attributes {
                      uid
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
          reader {
            data {
              id
              attributes {
                uid
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
