import { ImageAsset } from '~/components/presentation/Image';
import { getServerUrl } from '~/helpers/url';

import { Entity, AssetAttributes } from '../models';

export function toImageAsset(
  entity: Entity<AssetAttributes> | null | undefined
): ImageAsset | undefined {
  if (!entity) return undefined;
  const { url, previewUrl } = entity.attributes;
  return {
    url: getServerUrl(url),
    previewUrl: getServerUrl(previewUrl),
  };
}

export function parseEntity<TData, TAttributes>(
  entity: Entity<TAttributes>
): { data: TData; attributes: TAttributes } {
  const { id, attributes } = entity;
  const data = { id: id || '' } as unknown as TData;
  return { data, attributes };
}
