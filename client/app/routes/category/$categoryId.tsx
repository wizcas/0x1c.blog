import classNames from 'classnames';
import { CSSProperties, useMemo } from 'react';
import {
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
  Outlet,
  Link,
  MetaFunction,
} from 'remix';

import { CategoryContext } from '~/contexts/CategoryContext';
import { i } from '~/helpers/i18n';
import { genMeta } from '~/helpers/pageMeta';
import { getCategory } from '~/services/blog/category';
import type { Category } from '~/services/blog/models';

export const loader: LoaderFunction = async ({ params }) => {
  const { categoryId } = params;
  if (!categoryId) {
    throw json('Category ID is required', { status: 400 });
  }
  const category = await getCategory(categoryId);
  if (!category) {
    return redirect('/');
  }
  return json(category);
};

export const meta: MetaFunction = ({ data }: { data: Category }) => {
  const { title = '' } = data || {};
  return genMeta({
    title,
    description: title + i('栏目下的文章列表'),
  });
};

export default function CategoryIndex() {
  const category = useLoaderData<Category>();
  const markStyle = useMemo(
    () =>
      ({
        backgroundColor: category.themeColor,
      } as CSSProperties),
    [category.themeColor]
  );

  return (
    <CategoryContext.Provider value={category}>
      <main className="page-content flex flex-col gap-8">
        <header className="overflow-hidden z-10 p-4 relative">
          <div
            className={classNames(
              'w-32 h-32',
              'absolute -left-16 -top-16 -z-10',
              'rotate-45'
            )}
            style={markStyle}
          />
          <h2>
            <Link to="." className="!text-gray-50">
              {category.title}
            </Link>
          </h2>
          <p className="my-4">{category.description}</p>
        </header>
        <section className="space-y-8">
          <Outlet />
        </section>
      </main>
    </CategoryContext.Provider>
  );
}
