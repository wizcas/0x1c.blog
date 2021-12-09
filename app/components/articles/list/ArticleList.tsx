import { LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';

import { getArticles } from '~/services/blog/article';
import type { Article } from '~/services/blog/types';

import ArticleDetailedCard from './ArticleDetailedCard';

interface Props {
  articles: Article[];
  pagination: any;
}

export const articlesLoader: LoaderFunction = async ({ params }) => {
  const { cslug, ...rest } = params;
  invariant(cslug, 'Category is required');
  return getArticles({ cslug, ...rest });
  // return [];
};

export default function ArticleList({ articles, pagination }: Props) {
  const hasArticle = articles.length > 0;
  if (!hasArticle) {
    return (
      <div className="text-sm self-center text-light-200">No articles</div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleDetailedCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
