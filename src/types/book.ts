interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  publishedYear: number;
  genre: string;
  pageCount: number;
}

interface ReadingListItem {
  book: Book;
  status: 'to-read' | 'reading' | 'completed';
  currentPage: number;
  dateAdded: string;
}