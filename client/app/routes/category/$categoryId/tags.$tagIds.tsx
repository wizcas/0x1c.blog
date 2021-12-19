import { Tag } from 'react-feather';
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';

import {
  fetchArticles,
  PagedArticleList,
} from '~/components/articles/list/ArticleList';
import { i } from '~/helpers/i18n';
import { genMeta } from '~/helpers/pageMeta';
import type { Articles } from '~/services/blog/models';
import { getTags } from '~/services/blog/tag';

interface LoaderData {
  articles: Articles;
  tagLabels: string[];
}

export const loader: LoaderFunction = async (args) => {
  const { tagIds } = args.params;
  if (!tagIds) {
    throw json('tagIds are required', { status: 400 });
  }
  const { articles, filter } = await fetchArticles(args);
  const tags = await getTags(filter.tagIds || []);
  const tagLabels = tags.map((tag) => tag.label);
  return json({ articles, tagLabels } as LoaderData);
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  const title = data?.tagLabels?.join(',') || '';
  return genMeta({
    title,
    description: title + i('标签下的文章列表'),
  });
};

export default function TagsIndex() {
  const { tagLabels, articles } = useLoaderData<LoaderData>() || [];
  return (
    <>
      <h5 className="space-x-2">
        <Tag className="inline-block" />
        <span className="text-yellow-400">{`${tagLabels.join(',')}`}</span>
        <span>{i('标签下的文章')}</span>
      </h5>
      <PagedArticleList {...articles} />
    </>
  );
}
