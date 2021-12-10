import { CATEGORIES } from '~/mocks/categories';

export function getCategories() {
  return CATEGORIES;
}

export async function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
