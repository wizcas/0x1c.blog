import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';

import { Category } from '~/services/blog/types';

import ArticleIntroCard from './ArticleIntroCard';

interface Props {
  category: Category;
  odd: boolean;
  children?: ReactNode;
}
export default function CategoryIntroBlock({ category, odd, children }: Props) {
  const dir = odd ? 1 : -1;
  const cover3dStyle = {
    transform: `perspective(30rem)
    rotate3d(0.5, ${dir}, 0, 20deg) 
    translateX(${dir * 1}rem)`,
  } as CSSProperties;
  return (
    <div
      data-name="category-intro-block"
      className="relative min-h-superhero w-full"
      style={{ backgroundColor: category.color }}
    >
      <section
        data-name="category-intro-wrapper"
        className="transform -translate-y-32"
      >
        <div
          data-name="category-intro-header"
          className={classNames(
            'page-content h-full relative',
            'flex justify-between items-stretch gap-8 xl:gap-32',
            'relative h-64 md:h-64',
            {
              'flex-row-reverse': odd,
            }
          )}
        >
          <div
            data-name="category-intro-text"
            className="prose max-w-none grid grid-rows-2 flex-1 p-2"
          >
            <h1 className="self-end whitespace-nowrap">{category.title}</h1>
            <div className="mt-8 line-clamp-3">{category.description}</div>
          </div>
          {category.coverUrl && (
            <img
              data-name="category-intro-cover"
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
        <div data-name="category-intro-content">
          <ul
            data-name="category-intro-article-list"
            className={classNames(
              'page-content grid grid-cols-1 md:grid-cols-3 gap-4',
              'my-8'
            )}
          >
            {category.latestArticles?.map((article) => (
              <li>
                <ArticleIntroCard key={article.slug} article={article} />
              </li>
            ))}
            {children}
          </ul>
        </div>
      </section>
    </div>
  );
}
