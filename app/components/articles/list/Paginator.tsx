import classNames from 'classnames';
import clamp from 'lodash/clamp';
import { ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'react-feather';
import { useLocation, Link } from 'remix';

export function parsePage(search: string): number | undefined {
  const pageParam = new URLSearchParams(search).get('page');
  let page = (pageParam && Number(pageParam)) || undefined;
  if (Number.isNaN(page)) {
    page = undefined;
  }
  return page;
}

export function getPageQuery(search: string, page: number): string {
  const params = new URLSearchParams(search);
  params.set('page', String(page));
  return params.toString();
}

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
  maxNumbers = 8,
}: Props) {
  const location = useLocation();
  if (auto) {
    current = parsePage(location.search) || 1;
  }
  current = clamp(current ?? 1, 1, total);

  const hasPrev = current <= 1;
  const hasNext = current >= total;

  // how many pages to show under the constraint of maxNumbers
  const visiblePages = maxNumbers ? clamp(maxNumbers, 1, total) : 0;

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
        'flex justify-center items-center gap-1 text-sm',
        'paginator',
        className
      )}
    >
      <PageLink to={1} disabled={hasPrev}>
        <ChevronsLeft />
      </PageLink>
      <PageLink to={current - 1} disabled={hasPrev}>
        <ChevronLeft />
      </PageLink>
      {pageLinks}
      <PageLink to={current + 1} disabled={hasNext}>
        <ChevronRight />
      </PageLink>
      <PageLink to={total} disabled={hasNext}>
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
  const url = `./?${getPageQuery(location.search, to)}`;
  return (
    <li
      className={classNames(
        'flex flex-col items-stretch justify-center text-center',
        'w-6 h-8 leading-8',
        active && 'bg-gray-700'
      )}
    >
      {disabled || active ? (
        <div
          className={classNames(
            'cursor-default',
            disabled && 'opacity-30',
            active && 'text-primary-400 font-semibold'
          )}
        >
          {children}
        </div>
      ) : (
        <Link
          to={url}
          className={classNames('!text-gray-200 hover:!text-primary-400')}
        >
          {children}
        </Link>
      )}
    </li>
  );
}
