import { json, LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import {
  fetchArticles,
  PagedArticleList,
} from '~/components/articles/list/ArticleList';
import type { Articles } from '~/services/blog/types';

interface LoaderData {
  topicTitle: string;
  articles: Articles;
}

export const loader: LoaderFunction = async (args) => {
  const articles = await fetchArticles(args);
  const topicTitle = articles.filter?.tslug;
  invariant('tslug');
  return json({ articles, topicTitle } as LoaderData);
};
export default function TopicIndex() {
  const { topicTitle, articles } = useLoaderData<LoaderData>() || [];
  return (
    <>
      <h5>
        Articles in &nbsp;
        <code className="text-hi-primary">{`//${topicTitle}(todo)`}</code>
      </h5>
      <PagedArticleList {...articles} />
    </>
  );
}
