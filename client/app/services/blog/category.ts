import { json } from 'remix';

import { gqlClient, queries, converters } from './strapi';

export async function getCategories(withArticles = true) {
  const response = await gqlClient.request<queries.CategoriesResponse>(
    withArticles ? queries.categoriesWithArticles : queries.categories
  );
  return response.categories.data.map(converters.toCategoryModel);
}

export async function getCategory(categoryId: string) {
  const response = await gqlClient.request<
    queries.CategoryResponse,
    queries.CategoryVariable
  >(queries.category, { categoryId });
  const { data } = response.category;
  if (!data) throw json('Category not found', { status: 404 });
  return converters.toCategoryModel(data);
}
