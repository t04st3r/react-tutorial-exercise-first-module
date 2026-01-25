
export interface Book {
  id: string;
  title: string;
  author_key: string[];
  author_name: string[];
  description: string;
  coverImage: string;
  publishedYear: number;
  genre: string;
  pageCount: number;
  cover_i: number;
}

export interface ReadingListItem {
  book: Book;
  status: 'to-read' | 'reading' | 'completed';
  currentPage: number;
  dateAdded: string;
}

export type OpenLibraryResponse = {
  numFound: number;
  docs: Book[]

}