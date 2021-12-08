import { LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';

import { getArticles } from '~/services/blog/article';
import type { Article } from '~/services/blog/types';

import ArticleIntroCard from './home/ArticleIntroCard';

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
  const hasArtcle = articles.length > 0;
  return (
    <div className="flex flex-col items-stretch gap-4">
      {hasArtcle ? (
        articles.map((article) => <ArticleIntroCard article={article} />)
      ) : (
        <div className="text-sm self-center text-light-200">No articles</div>
      )}
    </div>
  );
}
