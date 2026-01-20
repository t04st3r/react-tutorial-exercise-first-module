import type { Book } from "../types/book.ts";


interface BookCardProps {
    book: Book;
    onAddToList: (book_id: string) => void;
    isInReadingList: (book_id: string) => boolean;
}


function BookCard ({book, onAddToList, isInReadingList}: BookCardProps) {
    return (
        <div key={book.id} className="book-card">
            <img src={book.getCoverImageUrl()} alt={book.title} className="book-cover" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-description">{book.description}</p>
            <p className="book-year">{book.publishedYear}</p>
            <p className="genre">{book.genre}</p>
            <p className="book-pagecount">{book.pageCount}</p>
            <div className="add-to-list-container">
                {isInReadingList(book.id) ? (
                    <p className="already-in-list">Already Added</p>
                ) : (
                    <button onClick={() => onAddToList(book.id)} className="add-to-list-button">
                        Add to List
                    </button>
                )}
            </div>
        </div>
    );
}