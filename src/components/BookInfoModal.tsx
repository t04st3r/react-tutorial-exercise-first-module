import type {Book} from "../types/book.ts";

interface props {
    book: Book;
    closeModal: () => void;
}
export const BookInfoModal = ({book, closeModal}: props) => {
    return (
        <div className="book-modal" >
            <button className="close-button" onClick={closeModal}>x</button>
            <img src={book.coverImage}/>
            <h1 className="book-card-title">{book.title}</h1>
            <h2>{book.publishedYear}</h2>
            <h2>{book.author}</h2>
        </div>
    )
}