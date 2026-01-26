export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    publishedYear: number;
    language: string;
    pageCount: number;
}
export type ReadingStatus = 'to-read' | 'reading' | 'completed';
export const statusLabel: Record<ReadingStatus, string> = {
    'to-read': 'To read',
    'reading': 'Reading',
    'completed': 'Completed',
}
export interface ReadingListItem {
    book: Book;
    status: ReadingStatus;
    currentPage: number;
    dateAdded: string;
}