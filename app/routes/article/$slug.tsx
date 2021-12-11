/* eslint-disable react/no-danger */
import classNames from 'classnames';
import { marked } from 'marked';
import { useMemo } from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import sanitize from 'sanitize-html';
import invariant from 'tiny-invariant';

import ArticleHeader from '~/components/articles/post/ArticleHeader';
import { CategoryContext } from '~/contexts/CategoryContext';
import { getArticle } from '~/services/blog/article';
import type { Article } from '~/services/blog/types';

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug, 'Article slug is required');
  return getArticle(slug);
};

export default function ArticlePage() {
  const article = useLoaderData<Article>();
  const { markdown = '', category = null } = article;

  const html = useMemo(() => {
    return sanitize(
      marked(markdown, {
        gfm: true,
        headerIds: true,
      }),
      {
        allowedAttributes: {
          '*': ['id'],
        },
      }
    );
  }, [markdown]);

  return (
    <CategoryContext.Provider value={category}>
      <main>
        <ArticleHeader article={article} />
        <div className="page-content flex gap-8">
          <aside className={classNames('w-64 flex-none hidden lg:block')}>
            <div className={classNames('sticky top-32 my-8')}>TOC</div>
          </aside>
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>
    </CategoryContext.Provider>
  );
}
