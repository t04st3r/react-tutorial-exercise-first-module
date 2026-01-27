import type {Book} from "../types/book.ts";
import BookCard from "./BookCard.tsx";

type BookListProps = {
  books: Book[];
  readingList: Book[];
  onAddToList: () => void;
};

export default function BookList({books, readingList, onAddToList }: BookListProps) {

    return (
        <div className="book-list">
            {books ? books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    isInReadingList={readingList.some(
                                    (readingBook) => readingBook.id === book.id
                    )}
                    onAddToList={onAddToList}
                    // onRemoveFromList={onRemoveFromList}
                />
            )) : <p> No Books Found</p>
            }
        </div>
    )
}
