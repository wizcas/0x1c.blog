import { createContext, useContext } from 'react';
import invariant from 'tiny-invariant';

import { Category } from '~/services/blog/types';

export const CategoryContext = createContext<Category | null>(null);

export function useCategorySlug(): string {
  const category = useContext(CategoryContext);
  const cslug = category?.slug.trim();
  invariant(cslug, 'Category slug is empty');
  return cslug;
}
