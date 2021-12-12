import classNames from 'classnames';
import { CSSProperties } from 'react';
import { Link } from 'remix';

import type { TocItem } from '~/services/blog/types';

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
  return (
    <ul>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            to={item.href}
            className={classNames(
              'quiet',
              'pl-[var(--offset)] py-1 inline-block',
              'border-l-4 border-transparent hover:border-hi-link pl-2'
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
