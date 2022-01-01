import { Reader } from './user';

export interface Comment {
  id: string;
  reader: Reader | null;
  parentId: string | null | undefined;
  parent?: Comment;
  markdown: string;
  text: string;
  html?: string;
  datetime: string;
  isEdited: boolean;
}
