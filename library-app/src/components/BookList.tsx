import type { Book, ReadingListItem } from "../types/books.ts";
import BookCard from "./BookCard";
import './BookList.scss';

interface BookListProps {
    books: Book[];
    onAddToList: (book: Book) => void;
    readingList: ReadingListItem[];
    onBookClick: (book: Book) => void;
}

const BookList = ({ books, onAddToList, readingList, onBookClick }: BookListProps) => {
    if (books.length === 0) {
        return (
            <div className="book-list--empty">
                <p>No books found. Try searching for something else!</p>
            </div>
        );
    }

    return (
        <div className="book-list">
            {books.map((book) => {
                const isInReadingList = readingList.some(item => item.book.id === book.id);
                return (
                    <BookCard
                        key={book.id}
                        book={book}
                        onAddToList={onAddToList}
                        isInReadingList={isInReadingList}
                        onClick={() => onBookClick(book)}
                    />
                );
            })}
        </div>
    );
};

export default BookList;