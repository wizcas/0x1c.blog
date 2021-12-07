import { json, MetaFunction, useLoaderData } from 'remix';

import CategoryIntroBlock from '~/components/articles/CategoryIntroBlock';
import { fetchCategories } from '~/services/blog/categories';

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
  return json(fetchCategories());
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const categories = useLoaderData<Category[]>();
  return (
    <div className="flex flex-col items-stretch">
      <div className="h-hero" />
      {categories.map((category, index) => (
        <CategoryIntroBlock
          key={category.slug}
          category={category}
          odd={index % 2 !== 0}
        />
      ))}
    </div>
  );
}
