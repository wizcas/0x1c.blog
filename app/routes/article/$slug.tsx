/* eslint-disable react/no-danger */
import classNames from 'classnames';
import hljsThemeUrl from 'highlight.js/styles/base16/eighties.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LinksFunction, LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import ArticleHeader from '~/components/articles/post/ArticleHeader';
import {
  ReadingContext,
  ReadingData,
} from '~/components/articles/post/ReadingContext';
import Toc from '~/components/articles/post/Toc';
import { CategoryContext } from '~/contexts/CategoryContext';
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

interface HeadingTop {
  id: string;
  top: number;
}

export default function ArticlePage() {
  const article = useLoaderData<Article>();
  const { html = '', category = null } = article;

  const htmlValue = useMemo(() => ({ __html: html }), [html]);

  const ref = useRef<HTMLDivElement>(null);
  const [headingTops, setHeadingTops] = useState<HeadingTop[]>([]);
  const [readingData, setReadingData] = useState<ReadingData>({
    activeHeadingId: article.toc?.[0].id,
  });

  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const tops: HeadingTop[] = [];
    root.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((value) => {
      const el = value as HTMLElement;
      const anchor = el.querySelector('a') as HTMLAnchorElement;
      tops.push({ id: anchor.id, top: el.offsetTop });
    });
    setHeadingTops(tops);
  }, [html]);

  useEffect(() => {
    function f() {
      const ratio = 0.5;
      const threshold = window.innerHeight * ratio;
      const mark = window.scrollY + threshold;

      function findActiveHeadingId(): string {
        for (let i = headingTops.length - 1; i >= 0; i--) {
          const headingTop = headingTops[i];
          if (headingTop.top <= mark) {
            return headingTop.id;
          }
        }
        return headingTops[0]?.id;
      }

      setReadingData({ activeHeadingId: findActiveHeadingId() });
    }
    window.addEventListener('scroll', f);
    f();
    return () => {
      window.removeEventListener('scroll', f);
    };
  }, [headingTops]);

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
