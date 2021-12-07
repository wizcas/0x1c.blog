import { Link } from 'remix';

import type { Topic } from '~/services/blog/types';

interface Props {
  topic: Topic;
}

export default function Topic({ topic }: Props) {
  return (
    <Link
      to={`/category/${topic.category.slug}/topics/${topic.slug}`}
      className="text-sm"
    >
      {`// ${topic.title}`}
    </Link>
  );
}
