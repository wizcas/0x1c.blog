import classNames from 'classnames';
import { CSSProperties, useMemo } from 'react';

import type { Article } from '~/services/blog/models';

import CategoryLink from '../meta/CategoryLink';
import DateTime from '../meta/DateTime';
import TagLink from '../meta/TagLink';
import TopicLink from '../meta/TopicLink';

const HERO_CLASS = classNames(
  'flex flex-col justify-end items-stretch',
  'md:h-hero',
  'bg-no-repeat bg-cover bg-center'
);
const HERO_FRONTMATTER_CLASS = classNames(
  'bg-gray-900 bg-opacity-70',
  'backdrop-blur-sm'
);

interface Props {
  article: Article;
}

export default function ArticleHeader({ article }: Props) {
  const { title, datetime, cover, category, topic, tags } = article;

  const coverStyle = useMemo(
    () =>
      ({
        backgroundImage: `url(${cover?.url})`,
      } as CSSProperties),
    [cover]
  );

  const frontmatter = (
    <section
      className={classNames('py-3', {
        [HERO_FRONTMATTER_CLASS]: !!cover,
      })}
    >
      <div className="page-content grid grid-cols-1 lg:grid-cols-2">
        <div>
          <h1 className="my-4 text-2xl">{title}</h1>
          <section className="breadcrumbs">
            <DateTime value={datetime} />
            {category && <CategoryLink category={category} />}
            {topic && <TopicLink topic={topic} />}
          </section>
        </div>
        {tags && (
          <section
            data-name="tags"
            className={classNames(
              'self-end mt-2',
              'flex gap-2',
              'flex-wrap justify-start items-start',
              'lg:flex-wrap-reverse lg:justify-end lg:items-end'
            )}
          >
            {tags.map((tag) => (
              <TagLink key={tag.id} tag={tag} />
            ))}
          </section>
        )}
      </div>
    </section>
  );
  return (
    <div
      data-name="head"
      className={classNames({
        [HERO_CLASS]: !!cover,
      })}
      style={coverStyle}
    >
      {frontmatter}
    </div>
  );
}
