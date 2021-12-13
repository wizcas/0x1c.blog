import { createContext } from 'react';

export interface ReadingData {
  activeHeadingId?: string;
}
export const ReadingContext = createContext<ReadingData>({});
