import type { iBook } from "../types/book.ts";


interface BookCardProps {
    book: iBook;
}


export function BookCard ({ book }: BookCardProps) {
    return (
        <div className="book-card">
            <img src={book.getCoverImageUrl()} alt={book.title} className="book-cover" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-description">{book.description}</p>
            <p className="book-year">{book.publishedYear}</p>
            <p className="genre">{book.language}</p>
            <p className="book-pagecount">{book.pageCount}</p>
        </div>
    );
}