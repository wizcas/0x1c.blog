import { json } from 'remix';

import { renderMarkdown } from '~/helpers/markdown';

import {
  gqlClient,
  queryArticle,
  QueryArticleResponse,
  queryArticles,
  QueryArticlesResponse,
  QueryArticlesVariable,
  QueryArticleVariable,
  toArticleModel,
} from './strapi';

import type { Articles, ArticlesFilter } from './models';

export async function getArticles(filter: ArticlesFilter) {
  const response = await gqlClient.request<
    QueryArticlesResponse,
    QueryArticlesVariable
  >(queryArticles, { ...filter });
  const { data, meta } = response.articles;
  return {
    articles: data.map(toArticleModel),
    totalPages: meta?.pagination.pageCount,
    ...filter,
  } as Articles;
}

export async function getArticle(id: string) {
  const response = await gqlClient.request<
    QueryArticleResponse,
    QueryArticleVariable
  >(queryArticle, { id });
  const { data } = response.article;
  if (!data) {
    throw json('Article not found', { status: 404 });
  }
  const article = toArticleModel(data);
  const { html, toc } = renderMarkdown(article.content);
  article.html = html;
  article.toc = toc;
  delete article.markdown;

  return article;
}
