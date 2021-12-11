import classNames from 'classnames';
import { useEffect } from 'react';
import { useRemark } from 'react-remark';
import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';

import { loremIpsum } from '~/mocks/lorem';
import { getArticle, GetArticleReturn } from '~/services/blog/article';

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug, 'Article slug is reuqired');
  return getArticle(slug);
};
export default function ArticlePage() {
  const { markdown } = useLoaderData<GetArticleReturn>();

  const [post, setPost] = useRemark();
  useEffect(() => {
    setPost(markdown);
  }, [markdown]);

  return (
    <main className={classNames('page-content')}>
      <h1>ArticleTitle</h1>
      <p>{loremIpsum(50)}</p>
      <div className="flex gap-8">
        <aside className={classNames('w-64 flex-none hidden lg:block')}>
          <div className={classNames('sticky top-32 my-8')}>TOC</div>
        </aside>
        <article className="prose">{post}</article>
      </div>
    </main>
  );
}
