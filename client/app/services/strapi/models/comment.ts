import { Collection, Singular } from './base';
import { ArticleAttributes } from './post';
import { ReaderAttributes } from './user';

export interface CommentAttributes {
  markdown: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  parent: Singular<CommentAttributes>;
  children: Collection<CommentAttributes>;
  article: Singular<ArticleAttributes>;
  reader: Singular<ReaderAttributes>;
}
