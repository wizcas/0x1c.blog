import { json, LoaderFunction, useLoaderData } from 'remix';

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
  const topicTitle = 'Topic Name';
  return json({ articles, topicTitle } as LoaderData);
};
export default function TopicIndex() {
  const { topicTitle, articles } = useLoaderData<LoaderData>() || [];
  return (
    <>
      <h5>
        Articles in &nbsp;
        <code className="text-hi-primary">{`//${topicTitle}`}</code>
      </h5>
      <PagedArticleList {...articles} />
    </>
  );
}
