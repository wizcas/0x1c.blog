import classNames from 'classnames';
import { CSSProperties } from 'react';

import Image from '~/components/presentation/Image';
import { CategoryContext } from '~/contexts/CategoryContext';
import type { Category } from '~/services/blog/models';

import LatestArticleList from './LastestArticleList';

interface Props {
  category: Category;
  odd: boolean;
}
export default function CategoryIntroBlock({ category, odd }: Props) {
  const dir = odd ? 1 : -1;
  const cover3dStyle = {
    transform: `perspective(30rem)
    rotate3d(0.5, ${dir}, 0, 20deg) 
    translateX(${dir * 2}rem)`,
  } as CSSProperties;
  return (
    <CategoryContext.Provider value={category}>
      <div
        data-name="category-intro-block"
        className="relative min-h-superhero w-full"
        style={{ backgroundColor: category.themeColor }}
      >
        <section
          data-name="category-intro-wrapper"
          className="page-content -translate-y-32"
        >
          <div
            data-name="category-intro-header"
            className={classNames(
              'flex justify-between items-stretch gap-8 xl:gap-32',
              'relative h-64 md:h-64',
              {
                'flex-row-reverse': odd,
              }
            )}
          >
            <div
              data-name="category-intro-text"
              className="prose max-w-none grid grid-rows-2 flex-1 py-2"
            >
              <h1 className="self-end whitespace-nowrap">{category.title}</h1>
              <div className="mt-8 line-clamp-3 cbcbcb">
                {category.description}
              </div>
            </div>
            {category.cover && (
              <Image
                data-name="category-intro-cover"
                asset={category.cover}
                alt=""
                className={classNames(
                  'h-10vh md:h-20vh lg:h-30vh max-h-96',
                  'rounded-md overflow-hidden',
                  'aspect-[4/3] lg:aspect-[16/10] object-cover',
                  'hidden md:block',
                  'flex-initial self-center'
                )}
                style={cover3dStyle}
              />
            )}
          </div>
          <div data-name="category-intro-content">
            {category.articles && (
              <LatestArticleList
                category={category}
                articles={category.articles}
                align={odd ? 'right' : 'left'}
              />
            )}
          </div>
        </section>
      </div>
    </CategoryContext.Provider>
  );
}
