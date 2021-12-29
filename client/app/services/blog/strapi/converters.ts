import type { ImageAsset } from '~/components/presentation/Image';
import { getServerUrl } from '~/helpers/url';

import type { Article, Category, Tag, Topic } from '../models';
import type {
  ArticleAttributes,
  AssetAttributes,
  CategoryAttributes,
  Entity,
  TagAttributes,
  TopicAttributes,
} from './models';

function toImageAsset(
  entity: Entity<AssetAttributes> | null | undefined
): ImageAsset | undefined {
  if (!entity) return undefined;
  const { url, previewUrl } = entity.attributes;
  return {
    url: getServerUrl(url),
    previewUrl: getServerUrl(previewUrl),
  };
}

function parseEntity<TData, TAttributes>(
  entity: Entity<TAttributes>
): { data: TData; attributes: TAttributes } {
  const { id, attributes } = entity;
  const data = { id: id || '' } as unknown as TData;
  return { data, attributes };
}

export function toCategoryModel(entity: Entity<CategoryAttributes>): Category {
  const { data, attributes } = parseEntity<Category, CategoryAttributes>(
    entity
  );
  return {
    ...data,
    title: attributes.title,
    description: attributes.description,
    cover: toImageAsset(attributes.cover?.data),
    themeColor: attributes.themeColor ?? '',
    articles: attributes.articles?.data.map((article) =>
      toArticleModel(article)
    ),
  };
}

export function toArticleModel(entity: Entity<ArticleAttributes>): Article {
  const { data, attributes } = parseEntity<Article, ArticleAttributes>(entity);
  return {
    ...data,
    title: attributes.title,
    excerpt: attributes.excerpt || '',
    cover: toImageAsset(attributes.cover?.data),
    datetime: attributes.updatedAt,
    content: attributes.content || '',
    category:
      attributes.category && attributes.category.data
        ? toCategoryModel(attributes.category.data)
        : undefined,
    topic:
      attributes.topic && attributes.topic.data
        ? toTopicModel(attributes.topic.data)
        : undefined,
    tags:
      attributes.tags && attributes.tags.data
        ? attributes.tags.data.map((tag) => toTagModel(tag))
        : undefined,
  };
}

export function toTopicModel(entity: Entity<TopicAttributes>): Topic {
  const { data, attributes } = parseEntity<Topic, TopicAttributes>(entity);
  return {
    ...data,
    title: attributes.title,
    category:
      attributes.category && attributes.category.data
        ? toCategoryModel(attributes.category.data)
        : undefined,
  };
}

export function toTagModel(entity: Entity<TagAttributes>): Tag {
  const { data, attributes } = parseEntity<Tag, TagAttributes>(entity);
  return {
    ...data,
    label: attributes.label,
    category:
      attributes.category && attributes.category.data
        ? toCategoryModel(attributes.category.data)
        : undefined,
  };
}
