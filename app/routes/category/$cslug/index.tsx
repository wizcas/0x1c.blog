import { useLoaderData } from 'remix';

import ArticleList, {
  articlesLoader,
} from '~/components/articles/list/ArticleList';
import Paginator from '~/components/articles/list/Paginator';
import type { Article } from '~/services/blog/types';

export const loader = articlesLoader;

export default function CategoryIndex() {
  const articles = useLoaderData<Article[]>() || [];
  return (
    <>
      <ArticleList articles={articles} pagination />
      <Paginator total={10} auto maxNumbers={20} />
    </>
  );
}
