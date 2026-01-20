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

export interface ReadingListItem {
    book: Book;
    status: 'to-read' | 'reading' | 'completed';
    currentPage: number;
    dateAdded: string;
}