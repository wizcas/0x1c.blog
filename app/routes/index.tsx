import classNames from 'classnames';
import { json, MetaFunction, useLoaderData } from 'remix';

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

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque ipsum viverra, blandit dui vitae, feugiat ex.`;
export const loader = () => {
  const categories: Category[] = [
    {
      title: 'Coding Career',
      slug: 'coding-career',
      description: LOREM_IPSUM,
      color: '#13557A',
      coverUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80',
    },
    {
      title: 'Game Making',
      slug: 'game-making',
      description: LOREM_IPSUM,
      color: '#D2AB70',
      coverUrl:
        'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80',
    },
    {
      title: 'Bits & Pieces',
      slug: 'bits-pieces',
      description: LOREM_IPSUM,
      color: '#813B58',
      coverUrl:
        'https://images.unsplash.com/photo-1560088032-d21fe602f4bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    },
  ];
  return json(categories);
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
          even={index % 2 !== 0}
        />
      ))}
    </div>
  );
}

interface CategoryBlockProps {
  category: Category;
  even: boolean;
}
function CategoryBlock({ category, even }: CategoryBlockProps) {
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
            'flex justify-between items-center gap-32',
            'absolute transform -translate-y-14 ',
            'h-1/3 relative',
            {
              'flex-row-reverse': even,
            }
          )}
        >
          <div className="prose">
            <h1>{category.title}</h1>
            <div>{category.description}</div>
          </div>
          {category.coverUrl && (
            <img src={category.coverUrl} alt="" className="w-2/5 rounded-md" />
          )}
        </div>
      </div>
    </div>
  );
}
