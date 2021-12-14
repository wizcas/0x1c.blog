import { json, LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import {
  fetchArticles,
  PagedArticleList,
} from '~/components/articles/list/ArticleList';
import type { Articles } from '~/services/blog/types';

interface LoaderData {
  articles: Articles;
  tagLabels: string[];
}

export const loader: LoaderFunction = async (args) => {
  const articles = await fetchArticles(args);
  const tagLabels = articles.filter?.gslugs;
  invariant('tagLabels');
  return json({ articles, tagLabels } as LoaderData);
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
