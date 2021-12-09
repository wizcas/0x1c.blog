import { useLoaderData } from 'remix';

import {
  articlesLoader,
  PagedArticleList,
} from '~/components/articles/list/ArticleList';
import type { Articles } from '~/services/blog/types';

export const loader = articlesLoader;
export default function TagsIndex() {
  const articles = useLoaderData<Articles>() || [];
  return <PagedArticleList {...articles} />;
}
