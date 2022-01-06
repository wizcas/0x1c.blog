import { useState } from 'react';

import { Comment } from '~/services/blog/models';

import CommentCard from './CommentCard';
import CommentEditor from './CommentEditor';

interface Props {
  comments: Comment[];
}

export default function CommentPanel({ comments }: Props) {
  const [repliedParent, setRepliedParent] = useState<Comment>();
  return (
    <div className="mt-16">
      <h1>
        评论区
        <a id="comments" href="#comments" className="anchor">
          #
        </a>
      </h1>
      <div className="mt-0 bg-gray-700 rounded-md comment-panel">
        <CommentEditor
          parent={repliedParent}
          onClearParent={() => setRepliedParent(undefined)}
        />
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onReply={setRepliedParent}
          />
        ))}
      </div>
    </div>
  );
}
