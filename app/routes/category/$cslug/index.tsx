import { useLoaderData } from 'remix';

import ArticleList, {
  articlesLoader,
} from '~/components/articles/list/ArticleList';
import type { Article } from '~/services/blog/types';

export const loader = articlesLoader;

export default function CategoryIndex() {
  const articles = useLoaderData<Article[]>() || [];
  return <ArticleList articles={articles} pagination />;
}
