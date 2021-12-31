import { Comment } from '../../blog/models';
import { CommentAttributes, Entity } from '../models';

import { parseEntity } from './parser';
import { toReaderModel } from './user';

export function toCommentModel(entity: Entity<CommentAttributes>): Comment {
  const { data, attributes } = parseEntity<Comment, CommentAttributes>(entity);
  return {
    ...data,
    content: attributes.content,
    datetime: attributes.updatedAt,
    isEdited: attributes.updatedAt > attributes.createdAt,
    parentId: attributes.parent.data?.id,
    reader: attributes.reader.data
      ? toReaderModel(attributes.reader.data)
      : null,
  };
}