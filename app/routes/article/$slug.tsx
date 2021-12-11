/* eslint-disable react/no-danger */
import classNames from 'classnames';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import { useMemo } from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import ArticleHeader from '~/components/articles/post/ArticleHeader';
import { CategoryContext } from '~/contexts/CategoryContext';
import ArticleMarkdownRenderer from '~/helpers/ArticleMarkdownRenderer';
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
    const md = marked(markdown, {
      gfm: true,
      renderer: new ArticleMarkdownRenderer(),
    });
    return DOMPurify.sanitize(md);
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
            className="prose prose-sm md:prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </main>
    </CategoryContext.Provider>
  );
}
