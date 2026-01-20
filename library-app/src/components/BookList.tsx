import { BookCard } from './BookCard';
import type { Book } from '../types/book';
import type { ReadingListItem } from '../types/reading_list_item';

interface BookListProps {
  books: Book[];
  onAddToList: (book: Book) => void;
  readingList: ReadingListItem[];
}

export function BookList({ books, onAddToList, readingList }: BookListProps) {
  // Check if a book is in the reading list
  const isBookInReadingList = (bookId: string): boolean => {
    return readingList.some((item) => item.book.id === bookId);
  };

  // Empty state when no books are found
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">No books match this filter</h3>
        <p className="text-sm text-gray-500">
          Try selecting a different genre or clear the filter.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onAddToList={onAddToList}
            isInReadingList={isBookInReadingList(book.id)}
          />
        ))}
      </div>
    </div>
  );
}