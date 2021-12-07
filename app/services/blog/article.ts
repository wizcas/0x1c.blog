import { generateArticles } from '~/mocks/articles';

export async function getArticles(categoryId: string) {
  return generateArticles(5);
}
