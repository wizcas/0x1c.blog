import { useLoaderData } from 'remix';

import {
  articlesLoader,
  PagedArticleList,
} from '~/components/articles/list/ArticleList';
import type { Articles } from '~/services/blog/models';

export const loader = articlesLoader;

export default function CategoryIndex() {
  const articles = useLoaderData<Articles>() || [];
  return <PagedArticleList {...articles} />;
}
