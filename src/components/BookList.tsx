import type { Book } from "../types/book";
import BookCard from "./BookCard";

interface BookListProps {
  books: Book[],
  // onAddToList: () => void,
  // readingList: ReadingListItem[]
}

const BookList = ({ books }: BookListProps) => {
  return (
    <div className="search-results">
      {books.length === 0
        ? <p>No books found</p>
        : books.map(book => <BookCard key={book.id} book={book} />)
      }
    </div>
  )
};

export default BookList;
