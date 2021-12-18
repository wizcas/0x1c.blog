import { json } from 'remix';

import {
  gqlClient,
  queryCategories,
  QueryCategoriesResponse,
  queryCategoriesWithArticles,
  queryCategory,
  QueryCategoryResponse,
  QueryCategoryVariable,
  toCategoryModel,
} from './strapi';

export async function getCategories(withArticles = true) {
  const response = await gqlClient.request<QueryCategoriesResponse>(
    withArticles ? queryCategoriesWithArticles : queryCategories
  );
  return response.categories.data.map(toCategoryModel);
}

export async function getCategory(categoryId: string) {
  const response = await gqlClient.request<
    QueryCategoryResponse,
    QueryCategoryVariable
  >(queryCategory, { categoryId });
  const { data } = response.category;
  if (!data) throw json('Category not found', { status: 404 });
  return toCategoryModel(data);
}
