import classNames from 'classnames';
import { CSSProperties, useMemo } from 'react';
import { Tag } from 'react-feather';
import { Link } from 'remix';

import type { Article } from '~/services/blog/types';

import DateTime from '../meta/DateTime';
import Topic from '../meta/Topic';

const COVER_CLASS = classNames(
  'bg-cover bg-center bg-clip-border bg-no-repeat',
  'bg-dark-900 bg-opacity-90',
  '!-m-4 !p-4 !pb-0 !mb-4',
  'flex flex-col justify-end'
);
const COVERED_TITLE_CLASS = '!-mx-4 px-4 py-2 bg-gray-900 bg-opacity-60';

interface Props {
  article: Article;
}
export default function ArticleDetailedCard({ article }: Props) {
  const url = `/articles/${article.slug}`;
  const bgUrl = article.cover && `url(${article.cover})`;
  const coverStyle = useMemo(
    () =>
      (bgUrl
        ? {
            backgroundImage: bgUrl,
          }
        : {}) as CSSProperties,
    [bgUrl]
  );
  return (
    <Link className="card" to={url}>
      <article
        className={classNames('prose h-full', 'flex flex-col items-stretch')}
      >
        <div
          className={classNames({ 'h-48': bgUrl, [COVER_CLASS]: bgUrl })}
          style={coverStyle}
        >
          <h3 className={classNames('!m-0', bgUrl && COVERED_TITLE_CLASS)}>
            {article.title}
          </h3>
        </div>
        <div className="space-x-2">
          <DateTime value={article.datetime} />
          {article.topic && <Topic topic={article.topic} />}
        </div>
        <p className={classNames(bgUrl ? 'line-clamp-5' : 'line-clamp-8')}>
          {article.excerpt}
        </p>
        <div className="spacer" />
        {article.tags && article.tags.length > 0 && (
          <section data-name="article-tag-list" className="space-x-4 text-sm">
            {article.tags.map((tag) => (
              <Link
                to={`/${tag.slug}`}
                className="space-x-1 !text-light-200 hover:!text-hi-primary"
              >
                <Tag className="icon" size="16" />
                <span>{tag.label}</span>
              </Link>
            ))}
          </section>
        )}
      </article>
    </Link>
  );
}
