import { json, LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';

import { getArticles } from '~/services/blog/article';
import type { Article } from '~/services/blog/types';

import ArticleCard from '../../card/ArticleCard';

import Paginator, { parsePage } from './Paginator';

const PAGE_SIZE = 12;

export const articlesLoader: LoaderFunction = async ({ params, request }) => {
  const { cslug, tslug, gslugs } = params;
  const { search } = new URL(request.url);
  const page = parsePage(search) || 1;
  invariant(cslug, 'Category is required');
  return json(
    await getArticles({
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      cslug,
      tslug,
      gslugs: gslugs?.split('+'),
    })
  );
};

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  const hasArticle = articles.length > 0;
  if (!hasArticle) {
    return (
      <div className="text-sm self-center text-light-200">No articles</div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}

interface PagedArticleListProps extends ArticleListProps {
  totalPages: number;
}

export function PagedArticleList({
  totalPages,
  ...rest
}: PagedArticleListProps) {
  return (
    <div className="space-y-8">
      <ArticleList {...rest} />
      <Paginator total={totalPages} auto />
    </div>
  );
}
