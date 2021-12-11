import fs from 'fs/promises';
import path from 'path';

import frontmatter from 'front-matter';

import { generateArticles, mockArticle } from '~/mocks/articles';

import type { Articles, ArticlesFilter } from './types';

export async function getArticles(filter: ArticlesFilter) {
  return {
    articles: generateArticles(5),
    totalPages: 10,
    filter,
  } as Articles;
}

export async function getArticle(slug: string) {
  console.log('getting article', slug);
  const mdxPath = path.join(__dirname, '../posts/wsl2.mdx');

  const file = await fs.readFile(mdxPath, 'utf8');
  const { attributes, body } = frontmatter<{ title: string }>(file);

  const article = mockArticle(Date.now().toString());
  article.markdown = body;
  article.title = attributes.title;

  return article;
}
