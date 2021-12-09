import classNames from 'classnames';
import clamp from 'lodash/clamp';
import { ReactNode } from 'react';
import { ChevronsLeft, ChevronsRight } from 'react-feather';
import { useLocation, Link } from 'remix';

interface Props {
  className?: string;
  maxNumbers?: number;
  total: number;
  current?: number;
  auto?: boolean;
}

export default function Paginator({
  auto,
  className,
  total,
  current,
  maxNumbers = 10,
}: Props) {
  const location = useLocation();
  if (auto) {
    const pageParam = new URLSearchParams(location.search).get('page');
    current = (pageParam && Number(pageParam)) || undefined;
    if (Number.isNaN(current)) {
      current = undefined;
    }
  }
  current = clamp(current ?? 1, 1, total);

  const hasPrev = current <= 1;
  const hasNext = current >= total;

  // how many pages to show under the constraint of maxNumbers
  const visiblePages = maxNumbers
    ? clamp(maxNumbers - 2 /* exclude prev & next */, 1, total)
    : 0;

  // try to split the leading and trailing items in average.
  // the cases of reaching start or end are handled specifically.
  let start = Math.max(1, current - Math.floor(visiblePages / 2));
  let end = start + visiblePages - 1;
  if (end > total) {
    end = total;
    start = total - visiblePages + 1;
  }
  // build up the page links
  const pageLinks: JSX.Element[] = [];
  for (let i = start; i <= end; i++) {
    pageLinks.push(
      <PageLink key={i} to={i} active={i === current}>
        {i}
      </PageLink>
    );
  }
  return (
    <ul
      className={classNames(
        'flex justify-center items-center gap-2 text-sm',
        className
      )}
    >
      <PageLink to={current - 1} disabled={hasPrev}>
        <ChevronsLeft />
      </PageLink>
      {pageLinks}
      <PageLink to={current + 1} disabled={hasNext}>
        <ChevronsRight />
      </PageLink>
    </ul>
  );
}

interface PageLinkProps {
  children: ReactNode;
  to: number;
  active?: boolean;
  disabled?: boolean;
}
function PageLink({ children, to, disabled, active }: PageLinkProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  params.set('page', String(to));
  const url = `./?${params.toString()}`;
  return (
    <li>
      {disabled || active ? (
        <div
          className={classNames(
            'cursor-default',
            disabled && 'opacity-30',
            active && 'text-hi-primary font-semibold'
          )}
        >
          {children}
        </div>
      ) : (
        <Link to={url} className="!text-light-100 hover:!text-hi-primary">
          {children}
        </Link>
      )}
    </li>
  );
}
