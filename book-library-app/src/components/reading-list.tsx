import type { iBook } from "../types/book.ts";
import { BookCard } from "./book-card.tsx";


interface ReadingListItemProps {
    book: iBook;
    onBookStatusUpdate: (book: iBook) => void;
    onRemoveFromList: (book: iBook) => void;
}


interface ReadingListProps {
    readingList: Array<iBook>;
    onBookStatusUpdate: (book: iBook) => void;
    onRemoveFromList: (book: iBook) => void;
}


export function ReadingListItem ({book, onBookStatusUpdate, onRemoveFromList}: ReadingListItemProps) {
    return (
        <div className="book-list-item">
            <BookCard book={book} />
            <div className="reading-status-container">
                <button
                    onClick={
                        () => {
                            book.setReadingStatus('To Read');
                            onBookStatusUpdate(book);
                        }
                    }
                    className={book.readingStatus === 'To Read' ? "to-read-button-disabled" : "to-read-button"}>
                    To Read
                </button>
                <button
                    onClick={
                        () => {
                            book.setReadingStatus('Reading');
                            onBookStatusUpdate(book);
                        }
                    }
                    className={book.readingStatus === 'Reading' ? "reading-button-disabled" : "reading-button"}>
                    Reading
                </button>
                <button
                    onClick={
                        () => {
                            book.setReadingStatus('Completed');
                            onBookStatusUpdate(book);
                        }
                    }
                    className={book.readingStatus === 'Completed' ? "completed-button-disabled" : "completed-button"}>
                    Completed
                </button>
            </div>
            <div className="page-status-container">
                <button
                    onClick={
                        () => {
                            book.readingPageNumberDecrease();
                            onBookStatusUpdate(book);
                        }
                    }
                    disabled={book.readingPageNumber <= 0 || book.readingStatus !== 'Reading'}
                    className={book.readingPageNumber <= 0 || book.readingStatus !== 'Reading' ? "page-number-decrease-button-disabled" : "page-number-decrease-button"}>
                    -
                </button>
                <p className="reading-current-page">{book.readingPageNumber}</p>
                <button
                    onClick={
                        () => {
                            book.readingPageNumberIncrease();
                            onBookStatusUpdate(book);
                        }
                    }
                    disabled={book.readingPageNumber >= book.pageCount || book.readingStatus !== 'Reading'}
                    className={book.readingPageNumber >= book.pageCount || book.readingStatus !== 'Reading' ? "page-number-increase-button-disabled" : "page-number-increase-button"}>
                    +
                </button>
            </div>
            <div className="remove-from-list-container">
                <button onClick={() => onRemoveFromList(book)} className="remove-from-list-button">
                    Remove from List
                </button>
            </div>
        </div>
    );
}


export function ReadingList ({readingList, onRemoveFromList, onBookStatusUpdate}: ReadingListProps) {
    return (
        <div className="book-list-panel">
            <h2>Book List</h2>
            <div className="book-list">
                {readingList.length === 0 ? <p className="no-books">No books found in reading list.</p> : (
                    readingList.map((book) => (
                        <ReadingListItem
                            key={book.id}
                            book={book}
                            onRemoveFromList={onRemoveFromList}
                            onBookStatusUpdate={onBookStatusUpdate}
                        />
                    ))
                )}
            </div>
        </div>
    );
}