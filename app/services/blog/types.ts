export interface Category {
  title: string;
  slug: string;
  color: string;
  description?: string;
  coverUrl?: string;
  articles?: Article[];
}

export interface Topic {
  slug: string;
  title: string;
  category: Category;
}

export interface Tag {
  slug: string;
  label: string;
}

export interface Article {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  datetime: string;
  cover?: string;
  topic?: Topic;
  tags?: Tag[];
}
