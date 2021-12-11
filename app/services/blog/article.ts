import fs from 'fs/promises';
import path from 'path';

import frontmatter from 'front-matter';

import { generateArticles } from '~/mocks/articles';

import type { Articles, ArticlesFilter } from './types';

export async function getArticles(filter: ArticlesFilter) {
  return {
    articles: generateArticles(5),
    totalPages: 10,
    filter,
  } as Articles;
}

export interface GetArticleReturn<FrontMatter = Record<string, unknown>> {
  attributes: FrontMatter;
  markdown: string;
}

export async function getArticle(slug: string) {
  console.log('getting article', slug);
  const mdxPath = path.join(__dirname, '../posts/wsl2.mdx');

  const file = await fs.readFile(mdxPath, 'utf8');
  const { attributes, body } = frontmatter(file);

  return { attributes, markdown: body } as GetArticleReturn;
}
