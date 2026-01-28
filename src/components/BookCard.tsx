import type {Book} from "../types/book.ts";
import {IconButton} from "@mui/material";
import {BookmarkAdd} from "@mui/icons-material";

type BookProps = {
    book: Book;
    isInReadingList: boolean;
    onAddToList: (book: Book) => void;
};

export default function BookCard({book, isInReadingList, onAddToList}: BookProps) {

    return (
        <div className='card'>
            <h2>{book.title}</h2>

            {book.cover_i ? (
                <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    className="book-image"
                    alt={`Cover of ${book.title}`}
                />
            ) : (
                <p>No image available</p>
            )}

            {book.author_name.map((author, idx) => (
                <p key={book.author_key[idx]}>By: <i>{author}</i></p>
            ))}

            <p>Year: {book.publishedYear}</p>

            {isInReadingList ? (
                <p>Already in reading list ✓</p>
            ) : (
                <IconButton
                    aria-label="add-to-reading-list"
                    size="large"
                    onClick={() => onAddToList(book)}
                >
                    <BookmarkAdd/>
                </IconButton>
            )}
        </div>
    );
}