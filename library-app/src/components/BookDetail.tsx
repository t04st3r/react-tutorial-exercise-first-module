import { useEffect } from 'react';
import type { Book } from '../types/book';
import type { ReadingListItem } from '../types/reading_list_item';

interface BookDetailProps {
  book: Book;
  readingListItem?: ReadingListItem;
  onClose: () => void;
  onAddToList?: (book: Book) => void;
  isInReadingList: boolean;
}

export function BookDetail({ book, readingListItem, onClose, onAddToList, isInReadingList }: BookDetailProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const progress = readingListItem && book.pageCount > 0
    ? (readingListItem.currentPage / book.pageCount) * 100
    : 0;

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Book Details</h2>
          <button onClick={onClose} className="close-button" aria-label="Close modal">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="book-detail-grid">
            <div className="book-detail-cover">
              <img src={book.coverImage} alt={`Cover of ${book.title}`} />

              {!isInReadingList && onAddToList && (
                <button onClick={() => onAddToList(book)} className="add-to-list-button">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add to Reading List
                </button>
              )}

              {isInReadingList && readingListItem && (
                <div className="in-list-badge">
                  <div className="in-list-header">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    In Your Reading List
                  </div>
                  <div className="in-list-status">
                    Status: <span>{readingListItem.status.replace('-', ' ')}</span>
                  </div>
                  {book.pageCount > 0 && (
                    <div className="in-list-progress">
                      <div className="progress-text">
                        Progress: {readingListItem.currentPage} / {book.pageCount} pages ({Math.round(progress)}%)
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="book-detail-info">
              <div className="book-detail-header">
                <h1>{book.title}</h1>
                <p className="book-detail-author">by {book.author}</p>
              </div>

              <div className="book-detail-meta">
                <div className="meta-item">
                  <p className="meta-label">Published Year</p>
                  <p className="meta-value">{book.publishedYear > 0 ? book.publishedYear : 'Unknown'}</p>
                </div>
                <div className="meta-item">
                  <p className="meta-label">Genre</p>
                  <p className="meta-value">{book.genre}</p>
                </div>
                <div className="meta-item">
                  <p className="meta-label">Page Count</p>
                  <p className="meta-value">{book.pageCount > 0 ? book.pageCount.toLocaleString() : 'Unknown'}</p>
                </div>
                {readingListItem && (
                  <div className="meta-item">
                    <p className="meta-label">Added On</p>
                    <p className="meta-value">{new Date(readingListItem.dateAdded).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              <div className="book-detail-description">
                <h3>Description</h3>
                <p>{book.description}</p>
              </div>

              {readingListItem && (
                <div className="reading-info-card">
                  <h3>Reading Information</h3>
                  <div className="reading-info-list">
                    <p>Status: <span>{readingListItem.status.replace('-', ' ')}</span></p>
                    <p>Current Page: <span>{readingListItem.currentPage}</span></p>
                    {book.pageCount > 0 && (
                      <p>Pages Remaining: <span>{book.pageCount - readingListItem.currentPage}</span></p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}