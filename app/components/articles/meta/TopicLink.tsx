import { Bookmark } from 'react-feather';
import { Link } from 'remix';

import { useCategorySlug } from '~/contexts/CategoryContext';
import type { Topic } from '~/services/blog/types';

interface Props {
  topic: Topic;
}

export default function TopicLink({ topic }: Props) {
  const cslug = useCategorySlug();
  return (
    <span className="inline-flex items-center gap-1">
      <Bookmark size={16} />
      <Link to={`/category/${cslug}/topic/${topic.slug}`} className="text-sm">
        {topic.title}
      </Link>
    </span>
  );
}
