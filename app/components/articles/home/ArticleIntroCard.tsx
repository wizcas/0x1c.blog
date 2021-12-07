import classNames from 'classnames';

import type { Article } from '~/services/blog/types';

interface Props {
  article: Article;
}
export default function ArticleIntroCard({ article }: Props) {
  return (
    <article
      className={classNames(
        'bg-dark-800 bg-opacity-50',
        'p-4 rounded-md',
        'flex flex-col items-stretch',
        'prose'
      )}
    >
      <h3>{article.title}</h3>
      <p className="line-clamp-5">{article.excerpt}</p>
    </article>
  );
}
