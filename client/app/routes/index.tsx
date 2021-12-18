import { json, MetaFunction, useLoaderData } from 'remix';

import CategoryIntroBlock from '~/components/articles/home/CategoryIntroBlock';
import { genMeta } from '~/helpers/pageMeta';
import { getCategories } from '~/services/blog/category';
import type { Category } from '~/services/blog/models';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return genMeta();
};

export const loader = async () => {
  return json(await getCategories());
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const categories = useLoaderData<Category[]>();
  return (
    <main className="flex flex-col items-stretch -mb-12">
      <div className="h-52" />
      {categories.map((category, index) => (
        <CategoryIntroBlock
          key={category.id}
          category={category}
          odd={index % 2 !== 0}
        />
      ))}
    </main>
  );
}
