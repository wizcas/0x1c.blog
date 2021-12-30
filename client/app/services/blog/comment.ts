import { json } from 'remix';

import { gqlClient, queries, mutations, converters } from '../strapi';

import { ReaderFormData } from './models';
import { upsertReader } from './user';

export async function getArticleComments(articleId: string) {
  const response = await gqlClient.request<
    queries.CommentsResponse,
    queries.CommentsVariable
  >(queries.comments, {
    articleId,
  });
  const hasComments = response.comments.data.length > 0;
  if (!hasComments) return [];
  return response.comments.data.map(converters.toCommentModel);
}

export async function postComment(
  reader: ReaderFormData,
  content: string,
  articleId: string,
  parentId: string
) {
  const upsertedReader = await upsertReader(reader);
  const readerId = upsertedReader.id;
  const data: mutations.CommentInput = {
    content,
    article: articleId,
    reader: readerId,
    parent: parentId,
  };
  const response = await gqlClient.request<
    mutations.PostCommentResponse,
    mutations.PostCommentVariable
  >(mutations.postComment, { data });
  const comment = response.comment.data;
  if (!comment) {
    throw json('comment not created', { status: 500 });
  }
  return converters.toCommentModel(comment);
}
