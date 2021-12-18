import { BookOpen } from 'react-feather';
import { Link } from 'remix';

import { useCategoryId } from '~/contexts/CategoryContext';
import type { Category } from '~/services/blog/types';

interface Props {
  category: Category;
}

export default function CategoryLink({ category }: Props) {
  const categoryId = useCategoryId();
  return (
    <span className="inline-flex items-center gap-1">
      <BookOpen size={16} />
      <Link to={`/category/${categoryId}`} className="text-sm">
        {category.title}
      </Link>
    </span>
  );
}
