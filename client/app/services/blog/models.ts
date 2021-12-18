export interface Category {
  id: string;
  title: string;
  color: string;
  description?: string;
  coverUrl?: string;
  articles?: Article[];
}

export interface Topic {
  id: string;
  title: string;
  category?: Category;
}

export interface Tag {
  id: string;
  label: string;
  category?: Category;
}

export interface Article {
  title: string;
  id: string;
  excerpt: string;
  content: string;
  datetime: string;
  cover?: string;
  topic?: Topic;
  category?: Category;
  tags?: Tag[];
  markdown?: string;
  html?: string;
  toc?: TocItem[];
}

export interface ArticlesFilter {
  categoryId: string;
  topicId?: string;
  tagIds?: string[];
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
  id: string;
  level: number;
  children?: TocItem[];
}
