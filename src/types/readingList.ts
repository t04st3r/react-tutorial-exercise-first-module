import type { Book } from './book.ts';

type ReadStatus = 'to-read' | 'reading' | 'completed';

export interface ReadingListItem {
  book: Book;
  status: ReadStatus;
  currentPage: number;
  dateAdded: string;
}
