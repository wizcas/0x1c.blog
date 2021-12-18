import classNames from 'classnames';
import { ChevronsRight } from 'react-feather';
import { Link } from 'remix';

import { i } from '~/helpers/i18n';
import type { Article, Category } from '~/services/blog/types';

import ArticleCard from '../../card/ArticleCard';

interface Props {
  category: Category;
  articles: Article[];
  align?: 'left' | 'right';
}

export default function LatestArticleList({
  category,
  articles,
  align = 'left',
}: Props) {
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
        {i('最新文章')}
      </h5>
      <ul className={classNames('grid grid-cols-1 lg:grid-cols-3 gap-4')}>
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleCard
              article={article}
              compact
              className="h-full bg-opacity-50 hover:!bg-opacity-60"
            />
          </li>
        ))}
      </ul>
      <Link
        to={`/category/${category.id}`}
        className={classNames('self-end', '!text-gray-200')}
      >
        {i('阅读更多')} <ChevronsRight className="inline-block" />
      </Link>
    </div>
  );
}
