import classNames from 'classnames';
import { CSSProperties, ReactNode, useContext } from 'react';
import { Link } from 'remix';

import { i } from '~/helpers/i18n';
import type { TocItem } from '~/services/blog/models';

import { ReadingContext } from './ReadingContext';

interface Props {
  toc: TocItem[];
  className?: string;
}
export default function Toc({ toc, className }: Props) {
  return (
    <div className={classNames('text-sm text-gray-400', className)}>
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
          <TocLink
            to={item.id}
            level={level}
            isActive={item.id === readingData.activeHeadingId}
          >
            {item.text}
          </TocLink>
          {item.children?.length && (
            <TocList items={item.children} level={level + 1} />
          )}
        </li>
      ))}
      {level === 1 && (
        <li>
          <TocLink to="comments" level={1}>
            {i('评论区')}
          </TocLink>
        </li>
      )}
    </ul>
  );
}

function TocLink({
  to,
  children,
  isActive,
  level,
}: {
  to: string;
  children: ReactNode;
  isActive?: boolean;
  level: number;
}) {
  return (
    <Link
      to={`#${to}`}
      className={classNames(
        'quiet',
        'pl-[var(--offset)] py-1 inline-block',
        'border-l-4 border-primary-400 border-opacity-0 hover:border-opacity-50',
        'transition-all duration-200',
        {
          'font-semibold text-gray-50 !border-opacity-100': isActive,
        }
      )}
      style={
        {
          '--offset': `${(level - 1) * 1 + 0.5}rem`,
        } as CSSProperties
      }
    >
      {children}
    </Link>
  );
}
