import classNames from 'classnames';
import { Book } from 'react-feather';
import { Link } from 'remix';

import CardHeader from '~/components/card/CardHeader';
import { i } from '~/helpers/i18n';
import type { Article } from '~/services/blog/models';

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
  const url = `/article/${article.id}`;
  return (
    <div className={classNames('card interact', className)}>
      <article className={classNames('h-full', 'flex flex-col items-stretch')}>
        <Link to={url} className="quiet">
          <CardHeader
            title={article.title}
            cover={article.cover}
            compact={compact}
          />
        </Link>
        <div className="flex items-center gap-2">
          <DateTime value={article.datetime} />
          {article.topic && <TopicLink topic={article.topic} />}
        </div>
        <Link
          className={classNames(
            'quiet my-6 relative',
            '-mx-4 px-4',
            EXCERPT_LINES[compact ? 'compact' : 'normal'](!!article.cover),
            'opener'
          )}
          to={url}
        >
          {article.excerpt}
          <div
            className={classNames(
              'opener-overlay',
              'absolute inset-y-0 right-0 w-full',
              'bg-gray-900',
              'flex justify-center items-center gap-2 p-4'
            )}
          >
            <Book />
            {i('继续阅读')}
          </div>
        </Link>
        <div className="spacer" />
        {article.tags && article.tags.length > 0 && (
          <section data-name="article-tag-list" className="space-x-4 text-sm">
            {article.tags.map((tag) => (
              <TagLink key={tag.id} tag={tag} />
            ))}
          </section>
        )}
      </article>
    </div>
  );
}
