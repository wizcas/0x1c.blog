import { json, LoaderFunction } from 'remix';

import { getArticles } from '~/services/blog/article';
import type { Article } from '~/services/blog/models';

import ArticleCard from '../../card/ArticleCard';

import Paginator, { parsePage } from './Paginator';

const PAGE_SIZE = 12;

export async function fetchArticles({
  params,
  request,
}: Parameters<LoaderFunction>[0]) {
  const { categoryId, topicId, tagIds } = params;
  if (!categoryId) {
    throw json('categoryId is required', { status: 400 });
  }
  const { search } = new URL(request.url);
  const page = parsePage(search) || 1;
  return getArticles({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    categoryId,
    topicId,
    tagIds: tagIds?.split('+'),
  });
}

export const articlesLoader: LoaderFunction = async (args) => {
  return json(await fetchArticles(args));
};

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  const hasArticle = articles.length > 0;
  if (!hasArticle) {
    return <div className="text-sm self-center text-gray-400">No articles</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

interface PagedArticleListProps extends ArticleListProps {
  pageCount: number;
}

export function PagedArticleList({
  pageCount,
  ...rest
}: PagedArticleListProps) {
  return (
    <div className="space-y-8">
      <ArticleList {...rest} />
      <Paginator total={pageCount} auto />
    </div>
  );
}
