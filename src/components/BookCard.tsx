import type {Book} from "../types/book.ts";
import {IconButton} from "@mui/material";
import {BookmarkAdded} from "@mui/icons-material";


type BookProps = {
  book: Book;
  isInReadingList: boolean;
  onAddToList: () => void;
  // onRemoveFromList: () => void;
};

export default function BookCard({book, isInReadingList, onAddToList}: BookProps) {

    return (
        <div className='card'>
            <h2>{book.title}</h2>

            {book.cover_i ?
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                     className="book-image" alt="Cover image of the book" /> :
                <p>No image available</p>
            }

            {book.author_name.map((author, idx) => (
                <p key={book.author_key[idx]}>By: <i>{author}</i></p>))}

            { isInReadingList ? <IconButton aria-label="already-added" size="large" onClick={onAddToList}>
                    <BookmarkAdded />
                </IconButton> : <p>Already in reading list</p>
            }

        </div>
  )
}
