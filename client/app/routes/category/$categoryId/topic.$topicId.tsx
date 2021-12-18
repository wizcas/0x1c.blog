import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';

import {
  fetchArticles,
  PagedArticleList,
} from '~/components/articles/list/ArticleList';
import { i } from '~/helpers/i18n';
import { genMeta } from '~/helpers/pageMeta';
import type { Articles } from '~/services/blog/models';
import { getTopic } from '~/services/blog/topic';

interface LoaderData {
  topicTitle: string;
  articles: Articles;
}

export const loader: LoaderFunction = async (args) => {
  const { topicId } = args.params;
  if (!topicId) {
    throw json('topicId is required', { status: 400 });
  }
  const { title: topicTitle } = await getTopic(topicId);
  const articles = await fetchArticles(args);
  return json({ articles, topicTitle } as LoaderData);
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  const title = data?.topicTitle || '';
  return genMeta({
    title,
    description: title + i('话题下的文章列表'),
  });
};

export default function TopicIndex() {
  const { topicTitle, articles } = useLoaderData<LoaderData>() || [];
  return (
    <>
      <h5 className="space-x-2">
        <span className="text-yellow-400">{`//${topicTitle}`}</span>
        <span>{i('话题下的文章')}</span>
      </h5>
      <PagedArticleList {...articles} />
    </>
  );
}
