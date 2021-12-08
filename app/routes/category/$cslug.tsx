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
  const { title, articles = [] } = useLoaderData<Category>();
  const hasArticles = articles.length > 0;
  return (
    <div>
      <h1>{title}</h1>
      <Outlet />
      <div>
        {hasArticles ? (
          articles.map((article) => (
            <div key={article.slug}>{article.title}</div>
          ))
        ) : (
          <div>No articles</div>
        )}
      </div>
    </div>
  );
}
