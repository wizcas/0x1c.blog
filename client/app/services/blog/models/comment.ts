import { Reader } from './user';

export interface Comment {
  id: string;
  reader: Reader | null;
  parentId: string | null | undefined;
  content: string;
}
