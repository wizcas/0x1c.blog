import { gql } from 'graphql-request';

import { CommentAttributes } from '../models/comment';

export type CreateCommentVariable = {
  articleId: string;
  comment: CommentAttributes;
};
export const createComment = gql``;
