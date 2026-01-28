import type {Book, ReadingListItem} from "../types/book.ts";
import BookCard from "./BookCard.tsx";

type BookListProps = {
  books: Book[];
  readingList: ReadingListItem[];
  onAddToList: (book: Book) => void;
};

export default function BookList({books, readingList, onAddToList }: BookListProps) {

    return (
        <div className="book-list">
            {books ? books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    isInReadingList={readingList.some(
                                    (readingBook) => readingBook.book.id === book.id
                    )}
                    onAddToList={onAddToList}
                />
            )) : <p> No Books Found</p>
            }
        </div>
    )
}
