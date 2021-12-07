import classNames from 'classnames';
import { CSSProperties } from 'react';
import { json, MetaFunction, useLoaderData } from 'remix';

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
        <CategoryBlock
          key={category.slug}
          category={category}
          odd={index % 2 !== 0}
        />
      ))}
    </div>
  );
}

interface CategoryBlockProps {
  category: Category;
  odd: boolean;
}
function CategoryBlock({ category, odd }: CategoryBlockProps) {
  const dir = odd ? 1 : -1;
  const cover3dStyle = {
    transform: `perspective(30rem)
    rotate3d(0.5, ${dir}, 0, 20deg) 
    translateX(${dir * 1}rem)`,
  } as CSSProperties;
  return (
    <div
      className="category-block relative h-superhero w-full"
      style={{ backgroundColor: category.color }}
    >
      <div
        className={classNames(
          'container h-full mx-auto relative',
          'p-4 sm:p-0'
        )}
      >
        <div
          className={classNames(
            'flex justify-between items-stretch gap-8 xl:gap-32',
            'absolute transform -translate-y-1/2',
            'relative h-64 md:h-64',
            {
              'flex-row-reverse': odd,
            }
          )}
        >
          <div className="prose max-w-none grid grid-rows-2 flex-1 p-2">
            <h1 className="self-end whitespace-nowrap">{category.title}</h1>
            <div className="mt-8 overflow-ellipsis overflow-hidden">
              {category.description}
            </div>
          </div>
          {/* <div className="flex-1 hidden md:block relative h-full">
            {category.coverUrl && (
              <img
                src={category.coverUrl}
                alt=""
                className={classNames(
                  'h-30vh max-h-96 rounded-md',
                  'absolute',
                  odd ? 'left-0' : 'right-0'
                )}
                style={cover3dStyle}
              />
            )}</div> */}
          {category.coverUrl && (
            <img
              src={category.coverUrl}
              alt=""
              className={classNames(
                'h-10vh md:h-20vh lg:h-30vh max-h-96 rounded-md',
                'hidden md:block',
                'flex-initial self-center'
              )}
              style={cover3dStyle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
