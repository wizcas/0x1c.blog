import { generateArticles } from '~/mocks/articles';

import { Articles } from './types';

export interface ArticlesFilter {
  cslug: string;
  tslug?: string;
  gslugs?: string[];
  offset?: number;
  limit: number;
}

export async function getArticles(filter: ArticlesFilter) {
  console.log('article filters', { filter });
  return {
    articles: generateArticles(5),
    totalPages: 10,
  } as Articles;
}
