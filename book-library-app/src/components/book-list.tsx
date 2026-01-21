import type { iBook } from "../types/book.ts";
import { BookCard } from "./book-card.tsx";


interface BookListItemProps {
    book: iBook;
    isInReadingList: boolean;
    onAddToList: () => void;
}


interface BookListProps {
    books: Array<iBook>;
    readingList: Array<iBook>;
    onAddToList: (book: iBook) => void;
}


export function BookListItem ({book, onAddToList, isInReadingList}: BookListItemProps) {
    return (
        <div className="book-list-item">
            <BookCard book={book} />
            <div className="add-to-list-container">
                {isInReadingList ? (
                    <p className="already-in-list">Already Added</p>
                ) : (
                    <button onClick={() => onAddToList()} className="add-to-list-button">
                        Add to List
                    </button>
                )}
            </div>
        </div>
    );
}


export function BookList ({books, readingList, onAddToList}: BookListProps) {
    return (
        <div className="book-list-panel">
            <h2>Book List</h2>
            <div className="book-list">
                {books.length === 0 ? <p className="no-books">No books found.</p> : (
                    books.map((book) => (
                        <BookListItem
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