/* eslint-disable react/no-danger */
import classNames from 'classnames';
import { useMemo } from 'react';
import { GitHub } from 'react-feather';

import { Comment } from '~/services/blog/models';

import DateTime from '../articles/meta/DateTime';

interface Props {
  comment: Comment;
  className?: string;
}
export default function CommentCard({ comment, className }: Props) {
  const htmlValue = useMemo(
    () => ({ __html: comment.html || '' }),
    [comment.html]
  );

  return (
    <div
      className={classNames(
        'transition-all duration-300',
        'p-4',
        'hover:bg-gray-600',
        className
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {comment.reader && (
          <>
            <span className="font-bold">{comment.reader.name}</span>
            {comment.reader.provider === 'github' && (
              <a
                href={comment.reader.website}
                target="_blank"
                referrerPolicy="origin"
                rel="noreferrer"
              >
                <GitHub size={16} />
              </a>
            )}
          </>
        )}
        <DateTime value={comment.datetime} />
      </div>
      <article
        dangerouslySetInnerHTML={htmlValue}
        className={classNames('px-4 bg-gray-700')}
      />
    </div>
  );
}
