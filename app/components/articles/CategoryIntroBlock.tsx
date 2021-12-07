import classNames from 'classnames';
import { CSSProperties } from 'react';

import { Category } from '~/services/blog/types';

interface Props {
  category: Category;
  odd: boolean;
}
export default function CategoryIntroBlock({ category, odd }: Props) {
  const dir = odd ? 1 : -1;
  const cover3dStyle = {
    transform: `perspective(30rem)
    rotate3d(0.5, ${dir}, 0, 20deg) 
    translateX(${dir * 1}rem)`,
  } as CSSProperties;
  return (
    <div
      data-name="category-intro-block"
      className="relative h-superhero w-full"
      style={{ backgroundColor: category.color }}
    >
      <div
        data-name="category-intro-content"
        className={classNames(
          'container h-full mx-auto relative',
          'p-4 sm:p-0',
          'flex justify-between items-stretch gap-8 xl:gap-32',
          'absolute transform -translate-y-1/2',
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
          <div className="mt-8 overflow-ellipsis overflow-hidden">
            {category.description}
          </div>
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
    </div>
  );
}
