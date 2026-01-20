import type { Book } from "../types/book.ts";
import { BookCard } from "./book-card.tsx";


interface BookListProps {
    books: Array<Book>;
    readingList: Array<string>;
    onAddToList: (book_id: string) => void;
}


function BookList ({books, readingList, onAddToList}: BookListProps) {
    return (
        <div className="book-list-panel">
            <h2>Book List</h2>
            <div className="book-list">
                {books.length === 0 ? <p className="no-books">No books found.</p> : (
                    books.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onAddToList={() => onAddToList(book.id)}
                            isInReadingList={readingList.indexOf(book.id) > -1}
                        />
                    ))
                )}
            </div>
        </div>
    );
}