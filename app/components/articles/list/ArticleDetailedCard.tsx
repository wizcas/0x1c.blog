import classNames from 'classnames';
import { Tag } from 'react-feather';
import { Link } from 'remix';

import CardHeader from '~/components/card/CardHeader';
import type { Article } from '~/services/blog/types';

import DateTime from '../meta/DateTime';
import Topic from '../meta/Topic';

interface Props {
  article: Article;
}
export default function ArticleDetailedCard({ article }: Props) {
  const url = `/articles/${article.slug}`;
  return (
    <Link className="card" to={url}>
      <article
        className={classNames('prose h-full', 'flex flex-col items-stretch')}
      >
        <CardHeader title={article.title} coverUrl={article.cover} />
        <div className="space-x-2">
          <DateTime value={article.datetime} />
          {article.topic && <Topic topic={article.topic} />}
        </div>
        <p
          className={classNames(
            article.cover ? 'line-clamp-5' : 'line-clamp-8'
          )}
        >
          {article.excerpt}
        </p>
        <div className="spacer" />
        {article.tags && article.tags.length > 0 && (
          <section data-name="article-tag-list" className="space-x-4 text-sm">
            {article.tags.map((tag) => (
              <Link
                key={tag.slug}
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