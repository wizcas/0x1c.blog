import fs from 'fs/promises';
import path from 'path';

import classNames from 'classnames';
import { LoaderFunction, useLoaderData } from 'remix';

import { loremIpsum } from '~/mocks/lorem';

import Post from '~/../posts/wsl2.mdx';

export const loader: LoaderFunction = async ({ params }) => {
  // const { slug } = params;
  // console.log({ a });
  // return a;
  // const mdxPath = path.join(__dirname, '../posts/wsl2.mdx');
  // const file = await fs.readFile(mdxPath, 'utf8');
  // console.log({ post });
  return null;
};
export default function ArticlePage() {
  // const a = useLoaderData();

  return (
    <main className={classNames('page-content')}>
      <h1>ArticleTitle</h1>
      <p>{loremIpsum(50)}</p>
      <div className="flex gap-8">
        <aside className={classNames('w-64 flex-none hidden lg:block')}>
          <div className={classNames('sticky top-32 my-8')}>TOC</div>
        </aside>
        <article className="prose">
          <Post />
        </article>
      </div>
    </main>
  );
}
