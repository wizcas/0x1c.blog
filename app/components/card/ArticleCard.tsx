import classNames from 'classnames';
import { Link } from 'remix';

import CardHeader from '~/components/card/CardHeader';
import type { Article } from '~/services/blog/types';

import DateTime from '../articles/meta/DateTime';
import TagLink from '../articles/meta/TagLink';
import TopicLink from '../articles/meta/TopicLink';

const EXCERPT_LINES = {
  normal: (cover: boolean) => (cover ? 'line-clamp-5' : 'line-clamp-10'),
  compact: (cover: boolean) => (cover ? 'line-clamp-3' : 'line-clamp-6'),
};

interface Props {
  article: Article;
  compact?: boolean;
  className?: string;
}
export default function ArticleCard({ article, compact, className }: Props) {
  const url = `/articles/${article.slug}`;
  return (
    <Link className={classNames('card interact', className)} to={url}>
      <article
        className={classNames('prose h-full', 'flex flex-col items-stretch')}
      >
        <CardHeader
          title={article.title}
          coverUrl={article.cover}
          compact={compact}
        />
        <div className="space-x-2">
          <DateTime value={article.datetime} />
          {article.topic && <TopicLink topic={article.topic} />}
        </div>
        <p
          className={classNames(
            EXCERPT_LINES[compact ? 'compact' : 'normal'](!!article.cover)
          )}
        >
          {article.excerpt}
        </p>
        <div className="spacer" />
        {article.tags && article.tags.length > 0 && (
          <section data-name="article-tag-list" className="space-x-4 text-sm">
            {article.tags.map((tag) => (
              <TagLink key={tag.slug} tag={tag} />
            ))}
          </section>
        )}
      </article>
    </Link>
  );
}
