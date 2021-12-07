export interface Category {
  title: string;
  slug: string;
  description: string;
  color: string;
  coverUrl?: string;
}

export interface Topic {
  slug: string;
  title: string;
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
  tags?: Tag[];
}
