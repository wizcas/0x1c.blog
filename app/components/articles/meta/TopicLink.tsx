import { Link } from 'remix';

import { useCategorySlug } from '~/contexts/CategoryContext';
import type { Topic } from '~/services/blog/types';

interface Props {
  topic: Topic;
}

export default function TopicLink({ topic }: Props) {
  const cslug = useCategorySlug();
  return (
    <Link to={`/category/${cslug}/topic/${topic.slug}`} className="text-sm">
      {`#${topic.title}`}
    </Link>
  );
}
