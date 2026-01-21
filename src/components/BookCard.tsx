import type { Book } from "../types/book";
import { getCoverImageUrl } from "../utils/book";

interface BookCardProps {
  book: Book,
  // onAddToList: () => void,
  // isInReadingList: (book: Book) => boolean;
}

const BookCard = ({ book }: BookCardProps) => {
  const imageUrl = getCoverImageUrl(book.coverImage);

  return (
    <div className="card">
      <img src={imageUrl} />
      <p><b>{book.title}</b> ({book.publishedYear})</p>
      <p>by {book.author}</p>
    </div>
  )
};

export default BookCard;
