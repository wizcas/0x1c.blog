import { json, LoaderFunction, redirect, useLoaderData, Outlet } from 'remix';
import invariant from 'tiny-invariant';

import { CategoryContext } from '~/contexts/CategoryContext';
import { getCategory } from '~/services/blog/category';
import type { Category } from '~/services/blog/types';

export const loader: LoaderFunction = async ({ params }) => {
  const { cslug } = params;
  invariant(cslug, 'Category slug is required');
  const category = await getCategory(cslug);
  if (!category) {
    return redirect('/');
  }
  return json(category);
};

export default function CategoryIndex() {
  const category = useLoaderData<Category>();

  return (
    <CategoryContext.Provider value={category}>
      <main className="page-content flex flex-col gap-8">
        <header className="hero">
          <h1>{category.title}</h1>
        </header>
        <section className="mb-16 space-y-8">
          <Outlet />
        </section>
      </main>
    </CategoryContext.Provider>
  );
}
