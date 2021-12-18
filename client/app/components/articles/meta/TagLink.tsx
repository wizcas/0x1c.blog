import { Tag as TagIcon } from 'react-feather';
import { Link } from 'remix';

import { useCategoryId } from '~/contexts/CategoryContext';
import type { Tag } from '~/services/blog/types';

interface Props {
  tag: Tag;
}
export default function TagLink({ tag }: Props) {
  const categoryId = useCategoryId();
  return (
    <Link
      to={`/category/${categoryId}/tags/${tag.id}`}
      className="space-x-1 text-sm !text-gray-400 hover:!text-primary-400"
    >
      <TagIcon className="icon" size="12" />
      <span>{tag.label}</span>
    </Link>
  );
}
