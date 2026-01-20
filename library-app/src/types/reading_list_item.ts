import type { Book } from './book';

export interface ReadingListItem {
  book: Book;
  status: 'to-read' | 'reading' | 'completed';
  currentPage: number;
  dateAdded: string;
}