import classNames from 'classnames';
import { Link } from 'remix';

import type { TocItem } from '~/services/blog/types';

interface Props {
  toc: TocItem[];
  className?: string;
}
export default function Toc({ toc, className }: Props) {
  return (
    <div className={classNames(className)}>
      <TocList items={toc} />
    </div>
  );
}

function TocList({ items }: { items: TocItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.href} data-level={item.level}>
          <Link to={item.href}>{item.text}</Link>
          {item.children?.length && <TocList items={item.children} />}
        </li>
      ))}
    </ul>
  );
}
