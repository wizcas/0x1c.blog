import { MetaFunction } from 'remix';

import { i } from '~/helpers/i18n';
import { genMeta } from '~/helpers/pageMeta';

export const meta: MetaFunction = () => {
  return genMeta({
    title: `${i('关于')}`,
    description: i('陈小一 Wizcas Chen 的个人博客、技术文章、作品展示'),
  });
};

export default function About() {
  return (
    <main className="page-content">
      <article className="prose">
        <h1>Me</h1>
        <p>
          Wizcas Chen 北京人，混迹于武汉和深圳 N 年，现居杭州。
          <br />
          Google 粉，微软粉，苹果路人。
          <br />
          主攻前端开发及游戏客户端开发，后端目前主要精力放在Golang上。
        </p>
      </article>
      <p className="text-sm text-gray-500 my-20">Todo</p>
    </main>
  );
}
