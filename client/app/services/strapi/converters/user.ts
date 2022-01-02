import { Reader } from '../../blog/models';
import { Entity, ReaderAttributes } from '../models';

import { parseEntity } from './parser';

export function toReaderModel(entity: Entity<ReaderAttributes>): Reader {
  const { data, attributes } = parseEntity<Reader, ReaderAttributes>(entity);
  return {
    ...data,
    name: attributes.name,
    website: attributes.website,
    provider: attributes.authUsers?.data[0]?.attributes?.provider,
    avatar: `https://avatars.dicebear.com/api/pixel-art-neutral/${attributes.uid}.svg`,
  };
}
