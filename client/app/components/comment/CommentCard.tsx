/* eslint-disable react/no-danger */
import Tippy from '@tippyjs/react';
import classNames from 'classnames';
import { useMemo } from 'react';
import { GitHub } from 'react-feather';

import { i } from '~/helpers/i18n';
import { Comment } from '~/services/blog/models';

import DateTime from '../articles/meta/DateTime';

interface Props {
  comment: Comment;
  onReply?: (parent: Comment) => void;
  isParent?: boolean;
  className?: string;
}
export default function CommentCard({
  comment,
  className,
  isParent,
  onReply,
}: Props) {
  const htmlValue = useMemo(
    () => ({ __html: comment.html || '' }),
    [comment.html]
  );

  return (
    <div
      className={classNames(
        'transition-all duration-300',
        'p-4',
        'border-t border-gray-600',
        'hover:bg-gray-600',
        className,
        {
          [classNames(
            'italic text-gray-300 p-4 border-gray-500',
            ' bg-gray-800 border hover:!bg-gray-800 bg-opacity-70'
          )]: isParent,
        }
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          {comment.reader && (
            <>
              {isParent && (
                <span className="text-xs text-gray-400">{i('回复')}</span>
              )}
              <span className="font-bold">{comment.reader.name}</span>
              {!isParent && (
                <span className="text-xs text-gray-400">{i('回复于')}</span>
              )}
              {comment.reader.provider === 'github' && (
                <Tippy content={i('去 GitHub 看看 TA')}>
                  <a
                    href={comment.reader.website}
                    target="_blank"
                    referrerPolicy="origin"
                    rel="noreferrer"
                  >
                    <GitHub size={16} />
                  </a>
                </Tippy>
              )}
            </>
          )}
          <DateTime value={comment.datetime} />
        </div>
        {!isParent && (
          <button
            type="button"
            className="text-sm text-gray-300 hover:text-gray-50"
            onClick={() => onReply?.(comment)}
          >
            {i('回复')}
          </button>
        )}
      </div>
      {comment.parent && <CommentCard comment={comment.parent} isParent />}
      {isParent ? (
        <article className="line-clamp-3 whitespace-pre-wrap">
          {comment.text}
        </article>
      ) : (
        <article dangerouslySetInnerHTML={htmlValue} />
      )}
    </div>
  );
}
