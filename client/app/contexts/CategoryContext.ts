import { createContext, useContext } from 'react';
import invariant from 'tiny-invariant';

import { Category } from '~/services/blog/types';

export const CategoryContext = createContext<Category | null>(null);

export function useCategoryId(): string {
  const category = useContext(CategoryContext);
  const id = category?.id.trim();
  invariant(id, 'Category ID is empty');
  return id;
}
