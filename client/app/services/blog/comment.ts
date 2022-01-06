import { json } from 'remix';

import CommentMarkdownRenderer from '~/helpers/CommentMarkdownRenderer';
import { renderMarkdown } from '~/helpers/markdown';

import { gqlClient, queries, mutations, converters } from '../strapi';

import { Comment, ReaderFormData } from './models';
import { upsertReader } from './user';

function renderHtml(model: Comment) {
  const { html } = renderMarkdown(
    model.markdown,
    new CommentMarkdownRenderer()
  );
  model.html = html;
  return model;
}

export async function getComments(articleId: string) {
  const response = await gqlClient.request<
    queries.CommentsResponse,
    queries.CommentsVariable
  >(queries.comments, {
    articleId,
  });
  const hasComments = response.comments.data.length > 0;
  if (!hasComments) return [];
  return response.comments.data.map((comment) =>
    renderHtml(converters.toCommentModel(comment))
  );
}

export interface CommentFormData {
  reader: ReaderFormData;
  markdown: string;
  text: string;
  articleId: string;
  parentId?: string;
}
export async function postComment({
  reader,
  markdown,
  text,
  articleId,
  parentId,
}: CommentFormData) {
  const upsertedReader = await upsertReader(reader);
  const readerId = upsertedReader.id;
  const data: mutations.CommentInput = {
    markdown,
    text,
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
  return renderHtml(converters.toCommentModel(comment));
}
