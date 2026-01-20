import type { Book, ReadingListItem } from '../types/books';
import './BookDetail.scss';

interface BookDetailProps {
  book: Book;
  readingListItem?: ReadingListItem;
  onClose: () => void;
  onUpdateStatus?: (bookId: string, status: ReadingListItem['status']) => void;
  onUpdatePage?: (bookId: string, page: number) => void;
  onRemove?: (bookId: string) => void;
  onAdd?: (book: Book) => void;
}

const BookDetail = ({ 
  book, 
  readingListItem, 
  onClose,
  onUpdateStatus,
  onUpdatePage,
  onRemove,
  onAdd
}: BookDetailProps) => {

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="book-detail-overlay" onClick={handleOverlayClick}>
      <div className="book-detail-modal" role="dialog" aria-modal="true">
        <button className="book-detail__close" onClick={onClose} aria-label="Close details">
          Close
        </button>
        
        <div className="book-detail__content">
          <div>
            <img src={book.coverImage} alt={book.title} className="book-detail__cover" />
            
            {readingListItem ? (
              <div>
                <div>
                  <label>Status:</label>
                  <select 
                    value={readingListItem.status}
                    onChange={(e) => onUpdateStatus?.(book.id, e.target.value as ReadingListItem['status'])}
                  >
                    <option value="to-read">To Read</option>
                    <option value="reading">Reading</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label>Page Progress:</label>
                  <input 
                    type="number" 
                    min="0" 
                    max={book.pageCount}
                    value={readingListItem.currentPage}
                    onChange={(e) => onUpdatePage?.(book.id, parseInt(e.target.value) || 0)}
                  />
                  <span> / {book.pageCount}</span>
                </div>
                
                <button 
                  onClick={() => onRemove?.(book.id)}
                >
                  Remove from List
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onAdd?.(book)}
              >
                Add to Reading List
              </button>
            )}
          </div>

          <div>
            <h2>{book.title}</h2>
            <h4>by {book.author}</h4>
            
            <div>
              <span className="badge">{book.language}</span>
              <span>{book.publishedYear}</span>
              <br></br>
              <span>{book.pageCount} pages</span>
            </div>

            <div>
              <h3>Description</h3>
              <p>{book.description || "No description available."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
