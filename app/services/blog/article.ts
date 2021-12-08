import { generateArticles } from '~/mocks/articles';

export interface ArticlesFilter {
  cslug: string;
  tslug?: string;
  gslugs?: string[];
}
export async function getArticles(filter: ArticlesFilter) {
  return generateArticles(5);
}
