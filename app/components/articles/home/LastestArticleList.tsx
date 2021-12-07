import classNames from 'classnames';
import { Link } from 'remix';

import type { Article } from '~/services/blog/types';

import ArticleIntroCard from './ArticleIntroCard';

interface Props {
  articles: Article[];
  align?: 'left' | 'right';
}

export default function LatestArticleList({ articles, align = 'left' }: Props) {
  return (
    <div
      data-name="latest-article-list"
      className={classNames('my-16', 'flex flex-col gap-4')}
    >
      <h5 className={align === 'left' ? 'self-start' : 'self-end'}>Latest</h5>
      <ul className={classNames('grid grid-cols-1 md:grid-cols-3 gap-4')}>
        {articles?.map((article) => (
          <li>
            <ArticleIntroCard key={article.slug} article={article} />
          </li>
        ))}
      </ul>
      <Link
        to="/"
        className={classNames(
          align === 'left' ? 'self-end' : 'self-start',
          'text-sm text-dark-400'
        )}
      >
        More articles&hellip;
      </Link>
    </div>
  );
}
