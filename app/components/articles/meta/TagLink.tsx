import { Tag as TagIcon } from 'react-feather';
import { Link } from 'remix';

import { useCategorySlug } from '~/contexts/CategoryContext';
import type { Tag } from '~/services/blog/types';

interface Props {
  tag: Tag;
}
export default function TagLink({ tag }: Props) {
  const cslug = useCategorySlug();
  return (
    <Link
      to={`/category/${cslug}/tags/${tag.slug}`}
      className="space-x-1 text-sm !text-light-200 hover:!text-hi-primary"
    >
      <TagIcon className="icon" size="12" />
      <span>{tag.label}</span>
    </Link>
  );
}
