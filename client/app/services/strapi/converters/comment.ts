import { Comment } from '../../blog/models';
import { CommentAttributes, Entity } from '../models';

import { parseEntity } from './parser';
import { toReaderModel } from './user';

export function toCommentModel(entity: Entity<CommentAttributes>): Comment {
  const { data, attributes } = parseEntity<Comment, CommentAttributes>(entity);
  const parentEntity = attributes.parent?.data;
  return {
    ...data,
    markdown: attributes.markdown,
    text: attributes.text,
    datetime: attributes.updatedAt,
    isEdited: attributes.updatedAt > attributes.createdAt,
    reader: attributes.reader.data
      ? toReaderModel(attributes.reader.data)
      : null,
    parentId: parentEntity?.id,
    parent: parentEntity ? toCommentModel(parentEntity) : undefined,
  };
}
