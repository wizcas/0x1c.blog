import { CATEGORIES } from '~/mocks/categories';

export function getCategories() {
  return CATEGORIES;
}

export async function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
