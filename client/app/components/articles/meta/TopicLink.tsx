import { Bookmark } from 'react-feather';
import { Link } from 'remix';

import { useCategoryId } from '~/contexts/CategoryContext';
import type { Topic } from '~/services/blog/models';

interface Props {
  topic: Topic;
}

export default function TopicLink({ topic }: Props) {
  const categoryId = useCategoryId();
  return (
    <span className="inline-flex items-center gap-1">
      <Bookmark size={16} />
      <Link
        to={`/category/${categoryId}/topic/${topic.id}`}
        className="text-sm"
      >
        {topic.title}
      </Link>
    </span>
  );
}
