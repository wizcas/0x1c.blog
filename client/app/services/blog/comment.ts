import { ReaderFormData } from './models';
import { gqlClient, queries } from './strapi';
import { toCommentModel } from './strapi/converters';

export async function getArticleComments(articleId: string) {
  const response = await gqlClient.request<
    queries.CommentsResponse,
    queries.CommentsVariable
  >(queries.comments, {
    articleId,
  });
  const hasComments = response.comments.data.length > 0;
  if (!hasComments) return [];
  return response.comments.data.map(toCommentModel);
}

export async function postComment(
  articleId: string,
  reader: ReaderFormData,
  content: string
) {
  return null;
}
