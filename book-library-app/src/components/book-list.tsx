import type { iBook } from "../types/book.ts";
import { BookCard } from "./book-card.tsx";


interface BookListProps {
    books: Array<iBook>;
    readingList: Array<iBook>;
    onAddToList: (book: iBook) => void;
}


export function BookList ({books, readingList, onAddToList}: BookListProps) {
    return (
        <div className="book-list-panel">
            <h2>Book List</h2>
            <div className="book-list">
                {books.length === 0 ? <p className="no-books">No books found.</p> : (
                    books.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onAddToList={() => onAddToList(book)}
                            isInReadingList={readingList.indexOf(book) > -1}
                        />
                    ))
                )}
            </div>
        </div>
    );
}