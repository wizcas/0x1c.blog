/* eslint-disable react/no-danger */
import classNames from 'classnames';
import hljsThemeUrl from 'highlight.js/styles/base16/eighties.css';
import { useEffect, useMemo, useRef } from 'react';
import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix';
import invariant from 'tiny-invariant';

import ArticleHeader from '~/components/articles/post/ArticleHeader';
import { ReadingContext } from '~/components/articles/post/ReadingContext';
import Toc from '~/components/articles/post/Toc';
import { copyAnchorLink } from '~/components/articles/post/TocAnchor';
import {
  getCommentFormData,
  getReaderInfo,
} from '~/components/comment/CommentEditor';
import CommentPanel from '~/components/comment/CommentPanel';
import { CategoryContext } from '~/contexts/CategoryContext';
import { genMeta } from '~/helpers/pageMeta';
import useReadingData from '~/hooks/useReadingData';
import { getArticle } from '~/services/blog/article';
import { getComments, postComment } from '~/services/blog/comment';
import type { Article, Comment } from '~/services/blog/models';

interface LoaderData {
  article: Article;
  comments: Comment[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  if (!id) {
    throw json('Article ID is required', { status: 400 });
  }
  return {
    article: await getArticle(id),
    comments: await getComments(id),
    ...(await getReaderInfo(request)),
  } as LoaderData;
};

export const action: ActionFunction = async (args) => {
  const { data, errors } = await getCommentFormData(args);
  if (errors) {
    return { commentFormErrors: errors };
  }
  invariant(data, 'comment form data is null');
  return postComment(data);
};

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: hljsThemeUrl,
  },
];

export const meta: MetaFunction = ({ data }: { data: Article }) => {
  const { title = '', excerpt = '' } = data || {};
  return genMeta({
    title,
    description: excerpt,
  });
};

export default function ArticlePage() {
  const { article, comments } = useLoaderData<LoaderData>();
  const { html = '', category = null } = article;

  const navScopeRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  const articleNode = useMemo(
    () => (
      <article ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />
    ),
    [html]
  );

  const readingData = useReadingData(
    { ref: navScopeRef, headingActiveRatio: 0.8 },
    [articleNode]
  );

  // Manually hydrate the anchors because they're out of React's scope
  useEffect(() => {
    const articleEl = articleRef.current;
    if (!articleEl) return;
    articleEl.querySelectorAll('[data-toc-anchor]').forEach((anchor) => {
      (anchor as HTMLElement).onclick = () => {
        copyAnchorLink(anchor.id);
      };
    });
  }, [articleNode]);

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
            <section className="prose prose-sm md:prose" ref={navScopeRef}>
              {articleNode}
              <CommentPanel comments={comments} />
            </section>
          </div>
        </main>
      </ReadingContext.Provider>
    </CategoryContext.Provider>
  );
}
