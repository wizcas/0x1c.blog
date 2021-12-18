import type { ID } from './generalTypes';

interface EntityData<TData> {
  data: {
    id: ID;
    attributes: TData;
  };
  meta?: EntityMeta;
}

interface EntityMeta {
  pagination: {
    total: number;
    pageCount: number;
    page: number;
    pageSize: number;
  };
}

interface Asset {
  data?: {
    attributes: {
      url: string;
      previewUrl?: string;
    };
  };
}

export type CategoryData = EntityData<{
  title: string;
  cover?: Asset;
  themeColor?: string;
  description?: string;
  topics?: TopicData[];
  tags?: TagData[];
}>;

export type TopicData = EntityData<{
  title: string;
  category?: CategoryData;
}>;

export type TagData = EntityData<{
  label: string;
  category?: CategoryData;
}>;

export type ArticleData = EntityData<{
  title: string;
  updatedAt: string;
  excerpt?: string;
  cover?: Asset;
  content?: string;
  // relationships
  category?: CategoryData;
  topic?: TopicData;
  tags?: TagData[];
}>;
