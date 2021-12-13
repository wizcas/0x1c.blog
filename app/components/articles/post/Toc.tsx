import classNames from 'classnames';
import { CSSProperties, useContext } from 'react';
import { Link } from 'remix';

import type { TocItem } from '~/services/blog/types';

import { ReadingContext } from './ReadingContext';

interface Props {
  toc: TocItem[];
  className?: string;
}
export default function Toc({ toc, className }: Props) {
  return (
    <div className={classNames('text-sm text-light-200', className)}>
      <TocList items={toc} level={1} />
    </div>
  );
}

function TocList({ items, level }: { items: TocItem[]; level: number }) {
  const readingData = useContext(ReadingContext);
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link
            to={`#${item.id}`}
            className={classNames(
              'quiet',
              'pl-[var(--offset)] py-1 inline-block',
              'border-l-4 border-transparent hover:border-hi-link',
              {
                'font-semibold text-light-50 border-hi-link':
                  item.id === readingData.activeHeadingId,
              }
            )}
            style={
              {
                '--offset': `${(level - 1) * 1 + 0.5}rem`,
              } as CSSProperties
            }
          >
            {item.text}
          </Link>
          {item.children?.length && (
            <TocList items={item.children} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}
