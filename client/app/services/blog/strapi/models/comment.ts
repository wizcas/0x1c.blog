import { Collection, Singular } from './base';
import { ArticleAttributes } from './post';
import { ReaderAttributes } from './user';

export interface CommentAttributes {
  content: string;
  parent: Singular<CommentAttributes>;
  children: Collection<CommentAttributes>;
  article: Singular<ArticleAttributes>;
  reader: Singular<ReaderAttributes>;
}
