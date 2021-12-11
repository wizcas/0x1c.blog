import fs from 'fs/promises';
import path from 'path';

import { marked } from 'marked';
import sanitize from 'sanitize-html';

import { generateArticles } from '~/mocks/articles';

import type { Articles, ArticlesFilter } from './types';

export async function getArticles(filter: ArticlesFilter) {
  return {
    articles: generateArticles(5),
    totalPages: 10,
    filter,
  } as Articles;
}

export interface GetArticleReturn {
  html: string;
}

export async function getArticle(slug: string) {
  console.log('getting article', slug);
  const mdxPath = path.join(__dirname, '../posts/wsl2.mdx');
  const markdown = await fs.readFile(mdxPath, 'utf8');

  const html = sanitize(marked(markdown));
  return { html } as GetArticleReturn;
}
