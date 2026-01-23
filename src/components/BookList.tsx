import type { Book } from "../types/book";
import type { ReadingListItem } from "../types/readingList";
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[],
  onAddToList: (book: Book) => void,
  readingList: ReadingListItem[],
}

const BookList = ({ books, onAddToList, readingList }: BookListProps) => {
  const isInReadingList = (book: Book): boolean => {
    return readingList.map(item => item.book.id).includes(book.id);
  }

  return (
    <div className="search-results">
      {books.length === 0
        ? <p>No books found</p>
        : books.map(book =>
          <BookCard
            key={book.id}
            book={book}
            onAddToList={onAddToList}
            isInReadingList={isInReadingList} />
        )
      }
    </div>
  )
};

export default BookList;
