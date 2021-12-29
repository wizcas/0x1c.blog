import { Collection, Singular } from './base';

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
