import fs from 'fs/promises';
import path from 'path';

import frontmatter from 'front-matter';
import invariant from 'tiny-invariant';

import { renderMarkdown } from '~/helpers/markdown';
import { generateArticles, mockArticle } from '~/mocks/articles';

import {
  gqlClient,
  queryArticle,
  QueryArticleResponse,
  QueryArticleVariable,
  toArticleModel,
} from './strapi';

import type { Articles, ArticlesFilter } from './models';

export async function getArticles(filter: ArticlesFilter) {
  return {
    articles: generateArticles(5),
    totalPages: 10,
    filter,
  } as Articles;
}

export async function getArticle(id: string) {
  // const { attributes, body } = frontmatter<{ title: string }>(file);
  // const article = mockArticle(Date.now().toString());
  const response = await gqlClient.request<
    QueryArticleResponse,
    QueryArticleVariable
  >(queryArticle, { id });
  const { data } = response.article;
  invariant(data, 'article not found');
  const article = toArticleModel(data);
  const { html, toc } = renderMarkdown(article.content);
  article.html = html;
  article.toc = toc;
  delete article.markdown;

  return article;
}
