import type { Book } from '../types/book.ts'
interface Props {
    book: Book;
    onAddToList: (book: Book) => void;
    isInReadingList: boolean;
    setSelectedBook: (bookId: Book) => void;
}
export const BookCard = ({book, isInReadingList, onAddToList, setSelectedBook}: Props) => {
    return (
        <div className="book-card">
            <h1 className="book-card-title">{book.title}</h1>
            <h2>{book.publishedYear}</h2>
            <h2>{book.author}</h2>
            <button
                disabled={isInReadingList}
                onClick={() => onAddToList(book)}>
                {isInReadingList ? "Already in readlist" : "Add to readlist"}
            </button>
            <button onClick={() => setSelectedBook({...book})}>More info</button>

        </div>
    )
}