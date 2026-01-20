import type { Book } from "../types/books.ts";
import './BookCard.scss';

interface BookCardProps {
    book: Book;
    onAddToList: (book: Book) => void;
    isInReadingList: boolean;
    onClick: () => void;
}

const BookCard = ({ book, onAddToList, isInReadingList, onClick }: BookCardProps) => {
    return (
        <div className="book-card" onClick={onClick}>
            <div className="book-card__image">
                <img src={book.coverImage} alt={book.title} />
            </div>
            <div className="book-card__content">
                <h3 className="book-card__title">{book.title}</h3>
                <p className="book-card__author">by {book.author}</p>
                <div>
                    <span>{book.publishedYear}</span>
                    <br></br>
                    <span>{book.language}</span>
                </div>
                <p>{book.description}</p>
                
                <button 
                    className="book-card__button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToList(book);
                    }}
                    disabled={isInReadingList}
                >
                    {isInReadingList ? 'Already Added' : 'Add to List'}
                </button>
            </div>
        </div>
    );
};

export default BookCard;