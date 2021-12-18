import { json, MetaFunction, useLoaderData } from 'remix';

import CategoryIntroBlock from '~/components/articles/home/CategoryIntroBlock';
import { i } from '~/helpers/i18n';
import { getCategories } from '~/services/blog/category';
import { Category } from '~/services/blog/types';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: '0x1C.dev',
    description: i('陈小一 Wizcas Chen 的个人博客、技术文章、作品展示'),
  };
};

export const loader = () => {
  return json(getCategories());
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
