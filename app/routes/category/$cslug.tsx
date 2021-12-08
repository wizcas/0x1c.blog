import { json, LoaderFunction, redirect, useLoaderData, Outlet } from 'remix';
import invariant from 'tiny-invariant';

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
  const { title } = useLoaderData<Category>();
  return (
    <main className="page-content flex flex-col gap-8">
      <header className="hero">
        <h1>{title}</h1>
      </header>
      <Outlet />
    </main>
  );
}
