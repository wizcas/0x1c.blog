/* eslint-disable react/no-danger */
import classNames from 'classnames';
import hljsThemeUrl from 'highlight.js/styles/base16/eighties.css';
import { useMemo, useRef } from 'react';
import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix';

import ArticleHeader from '~/components/articles/post/ArticleHeader';
import { ReadingContext } from '~/components/articles/post/ReadingContext';
import Toc from '~/components/articles/post/Toc';
import CommentEditor, {
  getCommentData,
} from '~/components/editor/CommentEditor';
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

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  if (!id) {
    throw json('Article ID is required', { status: 400 });
  }
  return {
    article: await getArticle(id),
    comments: await getComments(id),
  } as LoaderData;
};

export const action: ActionFunction = async (args) => {
  return postComment(await getCommentData(args));
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
            <section className="prose prose-sm md:prose">
              <article ref={ref} dangerouslySetInnerHTML={htmlValue} />
              <div className="mt-16 bg-gray-700 rounded-md">
                <CommentEditor />
                {comments.map((comment) => (
                  <div key={comment.id}>{comment.content}</div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </ReadingContext.Provider>
    </CategoryContext.Provider>
  );
}
