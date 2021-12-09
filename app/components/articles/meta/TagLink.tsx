import { Tag as TagIcon } from 'react-feather';
import { Link } from 'remix';

import type { Tag } from '~/services/blog/types';

interface Props {
  tag: Tag;
}
export default function TagLink({ tag }: Props) {
  return (
    <Link
      to={`/${tag.slug}`}
      className="space-x-1 !text-light-200 hover:!text-hi-primary"
    >
      <TagIcon className="icon" size="16" />
      <span>{tag.label}</span>
    </Link>
  );
}
