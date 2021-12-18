import type { ImageAsset } from '~/components/presentation/Image';

export interface Category {
  id: string;
  title: string;
  themeColor: string;
  description?: string;
  cover?: ImageAsset;
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
  cover?: ImageAsset;
  topic?: Topic;
  category?: Category;
  tags?: Tag[];
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
  pageCount: number;
  total: number;
}

export interface TocItem {
  text: string;
  id: string;
  level: number;
  children?: TocItem[];
}
