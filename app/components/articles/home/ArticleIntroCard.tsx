import classNames from 'classnames';
import { Link } from 'remix';

import type { Article } from '~/services/blog/types';

import DateTime from '../meta/DateTime';
import Topic from '../meta/Topic';

interface Props {
  article: Article;
}
export default function ArticleIntroCard({ article }: Props) {
  const url = `/articles/${article.slug}`;
  return (
    <Link className="card" to={url}>
      <article
        className={classNames(
          'bg-dark-800 bg-opacity-50',
          'p-4 rounded-md',
          'flex flex-col items-stretch',
          'prose'
        )}
      >
        <h3 className="!mt-0">{article.title}</h3>
        <div className="space-x-2">
          <DateTime value={article.datetime} />
          {article.topic && <Topic topic={article.topic} />}
        </div>
        <p className="line-clamp-5">{article.excerpt}</p>
      </article>
    </Link>
  );
}
