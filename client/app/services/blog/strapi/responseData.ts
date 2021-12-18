import type { ID } from './generalTypes';

export interface Collection<TAttributes> {
  data: Entity<TAttributes>[];
  meta?: CollectionMeta;
}
export interface Singular<TAttributes> {
  data: Entity<TAttributes> | null;
}

export interface Entity<TAttributes> {
  id?: ID;
  attributes: TAttributes;
}

export interface CollectionMeta {
  pagination: {
    total: number;
    pageCount: number;
    page: number;
    pageSize: number;
  };
}

export interface AssetAttributes {
  url: string;
  previewUrl?: string;
}

export interface CategoryAttributes {
  title: string;
  cover?: Singular<AssetAttributes>;
  themeColor?: string;
  description?: string;
  topics?: Collection<TopicAttributes>;
  tags?: Collection<TagAttributes>;
  articles?: Collection<ArticleAttributes>;
}

export interface TopicAttributes {
  title: string;
  // relationships
  category?: Singular<CategoryAttributes>;
}

export interface TagAttributes {
  label: string;
  // relationships
  category?: Singular<CategoryAttributes>;
}

export interface ArticleAttributes {
  title: string;
  updatedAt: string;
  excerpt?: string;
  cover?: Singular<AssetAttributes>;
  content?: string;
  // relationships
  category?: Singular<CategoryAttributes>;
  topic?: Singular<TopicAttributes>;
  tags?: Collection<TagAttributes>;
}
