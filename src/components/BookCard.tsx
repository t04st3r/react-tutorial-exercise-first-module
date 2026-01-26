import type { Book } from '../types/book.ts'
interface Props {
    book: Book;
    onAddToList: (book: Book) => void;
    isInReadingList: boolean;
    setSelectedBook: (bookId: Book) => void;
}
export const BookCard = ({book, isInReadingList, onAddToList, setSelectedBook}: Props) => {
    return (
        <div className="book-card" onClick={() => setSelectedBook({...book})}>
            <h1 className="book-card-title">{book.title}</h1>
            <h2>{book.publishedYear}</h2>
            <h2>{book.author}</h2>
            {isInReadingList ? (<p>Already Added</p>) : <button onClick={() => onAddToList(book)}>Add to list</button>}
            Click for details
        </div>
    )
}