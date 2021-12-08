import classNames from 'classnames';
import { ChevronsRight } from 'react-feather';
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
      className={classNames('mt-8 mb-24', 'flex flex-col gap-4')}
    >
      <h5
        className={classNames(
          'self-start',
          align === 'left' ? 'md:self-start' : 'md:self-end'
        )}
      >
        Latest
      </h5>
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
          'self-start',
          align === 'left' ? 'md:self-end' : 'md:self-start',
          '!text-light-100'
        )}
      >
        View more <ChevronsRight className="inline-block" />
      </Link>
    </div>
  );
}
