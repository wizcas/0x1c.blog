import { Collection, Singular } from './base';
import { ArticleAttributes } from './post';
import { ReaderAttributes } from './user';

export interface CommentAttributes {
  content: string;
  createdAt: string;
  updatedAt: string;
  parent: Singular<CommentAttributes>;
  children: Collection<CommentAttributes>;
  article: Singular<ArticleAttributes>;
  reader: Singular<ReaderAttributes>;
}
