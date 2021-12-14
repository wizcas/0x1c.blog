import { json, MetaFunction, useLoaderData } from 'remix';

import CategoryIntroBlock from '~/components/articles/home/CategoryIntroBlock';
import { getCategories } from '~/services/blog/category';

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: '0x1C.dev',
    description: 'All things that I have done.',
  };
};

interface Category {
  title: string;
  slug: string;
  description: string;
  color: string;
  coverUrl?: string;
}

export const loader = () => {
  return json(getCategories());
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const categories = useLoaderData<Category[]>();
  return (
    <main className="flex flex-col items-stretch">
      <div className="h-52" />
      {categories.map((category, index) => (
        <CategoryIntroBlock
          key={category.slug}
          category={category}
          odd={index % 2 !== 0}
        />
      ))}
    </main>
  );
}
