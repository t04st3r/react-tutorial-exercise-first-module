import type {iBook} from './book.ts';

export interface ReadingListItem {
    book: iBook;
    status: 'to-read' | 'reading' | 'completed';
    currentPage: number;
    dateAdded: string;
}
