import Book from './book';

interface ReadingListItem {
  book: Book;
  status: 'to-read' | 'reading' | 'completed';
  currentPage: number;
  dateAdded: string;
}