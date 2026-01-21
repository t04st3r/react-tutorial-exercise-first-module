import type {Book} from "../types/book.ts";
import BookCard from "./BookCard.tsx";

type BookListProps = {
  books: Book[];
  onAddToList: boolean;
  readingList: Book[];
};

export default function BookList({books, onAddToList, readingList }: BookListProps) {

    return (
        <div className="book-list">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    onAddToList={onAddToList}
                    // isInReadingList={readingList} TODO
                />
            ))}
        </div>
    )
}
