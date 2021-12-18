/* eslint-disable react/no-danger */
import classNames from 'classnames';
import hljsThemeUrl from 'highlight.js/styles/base16/eighties.css';
import { useMemo, useRef } from 'react';
import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix';

import ArticleHeader from '~/components/articles/post/ArticleHeader';
import { ReadingContext } from '~/components/articles/post/ReadingContext';
import Toc from '~/components/articles/post/Toc';
import { CategoryContext } from '~/contexts/CategoryContext';
import useReadingData from '~/hooks/useReadingData';
import { getArticle } from '~/services/blog/article';
import type { Article } from '~/services/blog/models';

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw json('Article ID is required', { status: 400 });
  }
  return getArticle(id);
};

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: hljsThemeUrl,
  },
];

export const meta: MetaFunction = ({ data }: { data: Article }) => {
  const { title = '', excerpt = '' } = data || {};
  return {
    title: `${title} - 0x1C.dev`,
    description: excerpt,
  };
};

export default function ArticlePage() {
  const article = useLoaderData<Article>();
  const { html = '', category = null } = article;

  const htmlValue = useMemo(() => ({ __html: html }), [html]);

  const ref = useRef<HTMLDivElement>(null);
  const readingData = useReadingData({ ref, headingActiveRatio: 0.8 }, [html]);

  return (
    <CategoryContext.Provider value={category}>
      <ReadingContext.Provider value={readingData}>
        <main>
          <ArticleHeader article={article} />
          <div className="page-content flex gap-8">
            <aside className={classNames('w-64 flex-none hidden lg:block')}>
              {article.toc && (
                <div className={classNames('sticky top-32 my-8')}>
                  <Toc toc={article.toc} />
                </div>
              )}
            </aside>
            <article
              className="prose prose-sm md:prose"
              ref={ref}
              dangerouslySetInnerHTML={htmlValue}
            />
          </div>
        </main>
      </ReadingContext.Provider>
    </CategoryContext.Provider>
  );
}
