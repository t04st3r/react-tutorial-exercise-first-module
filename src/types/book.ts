
export interface Book {
  id: string;
  title: string;
  author_key: string[];
  author_name: string[];
  description: string;
  coverImage: string;
  publishedYear: number;
  genre: string;
  number_of_pages_median: number;
  cover_i: number;
}

export interface ReadingListItem {
  book: Book;
  status: 'to-read' | 'reading' | 'completed';
  currentPage: number;
  dateAdded: string;
}
