import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import {
  fetchArticles,
  PagedArticleList,
} from '~/components/articles/list/ArticleList';
import { i } from '~/helpers/i18n';
import type { Articles } from '~/services/blog/types';

interface LoaderData {
  topicTitle: string;
  articles: Articles;
}

export const loader: LoaderFunction = async (args) => {
  const articles = await fetchArticles(args);
  const topicTitle = articles.filter?.topicId;
  invariant(topicTitle);
  return json({ articles, topicTitle } as LoaderData);
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  const title = data.topicTitle;
  return {
    title: `${title} - 0x1C.dev`,
    description: title + i('话题下的文章列表'),
  };
};

export default function TopicIndex() {
  const { topicTitle, articles } = useLoaderData<LoaderData>() || [];
  return (
    <>
      <h5>
        Articles in &nbsp;
        <code className="text-primary-400">{`//${topicTitle}(todo)`}</code>
      </h5>
      <PagedArticleList {...articles} />
    </>
  );
}
