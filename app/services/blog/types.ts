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
  category?: Category;
  tags?: Tag[];
  markdown?: string;
  html?: string;
  toc?: Toc;
}

export interface ArticlesFilter {
  cslug: string;
  tslug?: string;
  gslugs?: string[];
  offset?: number;
  limit: number;
}

export interface Articles {
  articles: Article[];
  totalPages: number;
  filter?: ArticlesFilter;
}

export interface TocItem {
  text: string;
  href: string;
  level: number;
  children?: TocItem[];
}
export interface Toc {
  items: TocItem[];
}
