import type {Book, ReadingListItem} from "../types/book.ts";
import {BookCard} from "./BookCard.tsx";

interface props {
    books: Book[];
    onAddToList: (book: Book) => void;
    readingList: ReadingListItem[];
    setSelectedBook: (book: Book) => void;
}
export const BookList = ({books, onAddToList, readingList, setSelectedBook}: props) => {
    return (
        <div className="book-list">
            {books.map((book: Book) => (
                <BookCard key={book.id}
                          book={book}
                          onAddToList={() => {onAddToList(book)}}
                          setSelectedBook={setSelectedBook}
                          isInReadingList={readingList.some((reading_list_book: ReadingListItem) => reading_list_book.book.id === book.id)} />
            ))}
            {books.length == 0 && <p>No books found</p>}
        </div>
    )
}