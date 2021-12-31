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
    <div className="mt-16 bg-gray-700 rounded-md comment-panel">
      <CommentEditor parent={repliedParent} />
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onReply={setRepliedParent}
        />
      ))}
    </div>
  );
}
