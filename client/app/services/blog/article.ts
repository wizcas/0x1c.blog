import fs from 'fs/promises';
import path from 'path';

import frontmatter from 'front-matter';

import { renderMarkdown } from '~/helpers/markdown';
import { generateArticles, mockArticle } from '~/mocks/articles';

import type { Articles, ArticlesFilter } from './types';

export async function getArticles(filter: ArticlesFilter) {
  return {
    articles: generateArticles(5),
    totalPages: 10,
    filter,
  } as Articles;
}

export async function getArticle(id: string) {
  console.log('getting article', id);
  const mdxPath = path.join(__dirname, '../posts/wsl2.mdx');

  const file = await fs.readFile(mdxPath, 'utf8');
  const { attributes, body } = frontmatter<{ title: string }>(file);

  const article = mockArticle(Date.now().toString());
  if (attributes?.title) {
    article.title = attributes.title;
  }
  const { html, toc } = renderMarkdown(body);
  article.html = html;
  article.toc = toc;
  delete article.markdown;

  return article;
}
