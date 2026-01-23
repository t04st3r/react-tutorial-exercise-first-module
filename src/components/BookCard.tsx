import type { Book } from "../types/book";
import { getCoverImageUrl } from "../utils/book";

type BookHandler = (book: Book) => void;

interface BookCardProps {
  book: Book,
  onAddToList: BookHandler,
  isInReadingList: (book: Book) => boolean,
}

const BookCard = ({ book, onAddToList, isInReadingList }: BookCardProps) => {
  const coverImageUrl = getCoverImageUrl(book.coverImage);

  // wrap the book handlers so that we stop event propagation before running it
  const handleAddToListButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    return onAddToList(book);
  }

  return (
    <div className="card">
      <img src={coverImageUrl} />
      <p><b>{book.title}</b> ({book.publishedYear})</p>
      <p>by {book.author}</p>
      {isInReadingList(book) || <button onClick={handleAddToListButtonClick}>Add to reading list</button>}
    </div>
  )
};

export default BookCard;
