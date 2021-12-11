import { Link } from 'remix';

import { useCategorySlug } from '~/contexts/CategoryContext';
import type { Category } from '~/services/blog/types';

interface Props {
  category: Category;
}

export default function CategoryLink({ category }: Props) {
  const cslug = useCategorySlug();
  return (
    <Link to={`/category/${cslug}`} className="text-sm">
      {`//${category.title}`}
    </Link>
  );
}
