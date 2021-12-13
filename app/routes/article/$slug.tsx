/* eslint-disable react/no-danger */
import classNames from 'classnames';
import hljsThemeUrl from 'highlight.js/styles/base16/eighties.css';
import { useMemo, useRef } from 'react';
import { LinksFunction, LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import ArticleHeader from '~/components/articles/post/ArticleHeader';
import { ReadingContext } from '~/components/articles/post/ReadingContext';
import Toc from '~/components/articles/post/Toc';
import { CategoryContext } from '~/contexts/CategoryContext';
import useReadingData from '~/hooks/useReadingData';
import { getArticle } from '~/services/blog/article';
import type { Article } from '~/services/blog/types';

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug, 'Article slug is required');
  return getArticle(slug);
};

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: hljsThemeUrl,
  },
];

export default function ArticlePage() {
  const article = useLoaderData<Article>();
  const { html = '', category = null } = article;

  const htmlValue = useMemo(() => ({ __html: html }), [html]);

  const ref = useRef<HTMLDivElement>(null);
  const readingData = useReadingData({ ref, headingActiveRatio: 0.5 }, [html]);

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
