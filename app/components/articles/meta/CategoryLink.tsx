import { BookOpen } from 'react-feather';
import { Link } from 'remix';

import { useCategorySlug } from '~/contexts/CategoryContext';
import type { Category } from '~/services/blog/types';

interface Props {
  category: Category;
}

export default function CategoryLink({ category }: Props) {
  const cslug = useCategorySlug();
  return (
    <span className="inline-flex items-center gap-1">
      <BookOpen size={16} />
      <Link to={`/category/${cslug}`} className="text-sm">
        {category.title}
      </Link>
    </span>
  );
}
