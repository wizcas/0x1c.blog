import { CATEGORIES } from '~/mocks/categories';

import {
  gqlClient,
  QueryCategoriesResponse,
  queryCategoriesWithArticles,
  toCategoryModel,
} from './strapi';

export async function getCategories() {
  const response = await gqlClient.request<QueryCategoriesResponse>(
    queryCategoriesWithArticles
  );
  return response.categories.data.map((category) => toCategoryModel(category));
}

export async function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
