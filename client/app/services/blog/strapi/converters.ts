import type { CategoryAttributes, Entity } from '.';
import type { Category } from '../models';

export function toCategoryModel(entity: Entity<CategoryAttributes>): Category {
  const { id, attributes } = entity;
  return {
    id: id || '',
    title: attributes.title,
    description: attributes.description,
    coverUrl: attributes.cover?.data?.attributes.url ?? '',
    color: attributes.themeColor ?? '',
  };
}
