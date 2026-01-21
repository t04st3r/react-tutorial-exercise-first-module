import { useState } from 'react';
import type { ReadingListItem } from '../types/reading_list_item';
import type { Book } from '../types/book';

interface ReadingListItemProps {
  item: ReadingListItem;
  onUpdateStatus: (bookId: string, status: 'to-read' | 'reading' | 'completed') => void;
  onUpdatePage: (bookId: string, page: number) => void;
  onRemove: (bookId: string) => void;
  onViewDetails?: (book: Book) => void;
}

export function ReadingListItem({ item, onUpdateStatus, onUpdatePage, onRemove, onViewDetails }: ReadingListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pageInput, setPageInput] = useState(item.currentPage.toString());

  const { book, status, currentPage } = item;
  const progress = book.pageCount > 0 ? (currentPage / book.pageCount) * 100 : 0;

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'to-read': return 'to-read';
      case 'reading': return 'reading';
      case 'completed': return 'completed';
      default: return 'to-read';
    }
  };

  const handleStatusChange = (newStatus: 'to-read' | 'reading' | 'completed') => {
    onUpdateStatus(book.id, newStatus);
  };

  const handleIncrementPage = () => {
    if (currentPage < book.pageCount) {
      onUpdatePage(book.id, currentPage + 1);
      setPageInput((currentPage + 1).toString());
    }
  };

  const handleDecrementPage = () => {
    if (currentPage > 0) {
      onUpdatePage(book.id, currentPage - 1);
      setPageInput((currentPage - 1).toString());
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputBlur = () => {
    const page = parseInt(pageInput, 10);
    if (!isNaN(page) && page >= 0 && page <= book.pageCount) {
      onUpdatePage(book.id, page);
    } else {
      setPageInput(currentPage.toString());
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(book.id);
  };

  return (
    <div className="reading-list-item">
      <div className="item-content">
        <div className="item-cover" onClick={() => onViewDetails?.(book)}>
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
          />
        </div>

        <div className="item-details">
          <div className="item-header">
            <div className="item-title-section" onClick={() => onViewDetails?.(book)}>
              <h3>{book.title}</h3>
              <p className="item-author">{book.author}</p>
            </div>
            <button
              onClick={handleRemove}
              className="remove-button"
              aria-label="Remove from reading list"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="status-badges">
            <button
              onClick={() => handleStatusChange('to-read')}
              className={`status-badge ${status === 'to-read' ? `active ${getStatusColor('to-read')}` : ''}`}
            >
              To Read
            </button>
            <button
              onClick={() => handleStatusChange('reading')}
              className={`status-badge ${status === 'reading' ? `active ${getStatusColor('reading')}` : ''}`}
            >
              Reading
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`status-badge ${status === 'completed' ? `active ${getStatusColor('completed')}` : ''}`}
            >
              Completed
            </button>
          </div>

          {book.pageCount > 0 && (
            <div className="progress-section">
              <div className="progress-header">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className={`progress-bar ${status === 'completed' ? 'completed' : ''}`}>
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <div className="page-controls">
                <button
                  onClick={handleDecrementPage}
                  disabled={currentPage === 0}
                  className="page-button"
                  aria-label="Decrease page"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="page-input-group">
                  <span className="page-label">Page</span>
                  <input
                    type="number"
                    value={pageInput}
                    onChange={handlePageInputChange}
                    onBlur={handlePageInputBlur}
                    min="0"
                    max={book.pageCount}
                  />
                  <span className="page-label">of {book.pageCount}</span>
                </div>

                <button
                  onClick={handleIncrementPage}
                  disabled={currentPage === book.pageCount}
                  className="page-button"
                  aria-label="Increase page"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {book.description && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="expand-button"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {isExpanded && book.description && (
            <p className="item-description">{book.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}