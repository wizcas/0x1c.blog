import { Reader } from './user';

export interface Comment {
  id: string;
  reader: Reader | null;
  parentId: string | null | undefined;
  markdown: string;
  text: string;
  html?: string;
  datetime: string;
  isEdited: boolean;
}
