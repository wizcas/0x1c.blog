import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix';

import {
  fetchArticles,
  PagedArticleList,
} from '~/components/articles/list/ArticleList';
import { i } from '~/helpers/i18n';
import { genMeta } from '~/helpers/pageMeta';
import type { Articles } from '~/services/blog/models';

interface LoaderData {
  articles: Articles;
  tagLabels: string[];
}

export const loader: LoaderFunction = async (args) => {
  const articles = await fetchArticles(args);
  const tagLabels = articles.filter?.tagIds;
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
      <h5>
        Articles in &nbsp;
        <code className="text-primary-400">{`#${tagLabels.join(
          ', '
        )}(todo)`}</code>
      </h5>
      <PagedArticleList {...articles} />;
    </>
  );
}
