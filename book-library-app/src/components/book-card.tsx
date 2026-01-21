import type { iBook } from "../types/book.ts";


interface BookCardProps {
    book: iBook;
    isInReadingList: boolean;
    onAddToList: () => void;
}


export function BookCard ({book, onAddToList, isInReadingList}: BookCardProps) {
    return (
        <div className="book-card">
            <img src={book.getCoverImageUrl()} alt={book.title} className="book-cover" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-description">{book.description}</p>
            <p className="book-year">{book.publishedYear}</p>
            <p className="genre">{book.language}</p>
            <p className="book-pagecount">{book.pageCount}</p>
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