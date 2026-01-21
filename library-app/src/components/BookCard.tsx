import { useState } from 'react';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onAddToList: (book: Book) => void;
  isInReadingList: boolean;
  onViewDetails?: (book: Book) => void;
}

export function BookCard({ book, onAddToList, isInReadingList, onViewDetails }: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInReadingList) return;

    setIsLoading(true);
    try {
      await onAddToList(book);
    } catch (error) {
      console.error('Error adding book to list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(book);
    }
  };

  return (
    <div className="book-card" onClick={handleCardClick}>
      <div className="book-cover">
        <img
          src={imageError ? '/src/assets/placeholder-book-cover.svg' : book.coverImage}
          alt={`Cover of ${book.title}`}
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>

        <p className="book-author">{book.author}</p>

        <div className="book-meta">
          <span className="book-year">
            {book.publishedYear > 0 ? book.publishedYear : 'Year unknown'}
          </span>
          {book.genre && book.genre !== 'Unknown' && (
            <span className="book-genre">{book.genre}</span>
          )}
        </div>

        <button
          onClick={handleAddClick}
          disabled={isInReadingList || isLoading}
          className={`add-button ${isInReadingList ? 'already-added' : ''}`}
          aria-label={isInReadingList ? 'Book already in reading list' : 'Add book to reading list'}
        >
          {isLoading ? (
            <>
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adding...
            </>
          ) : isInReadingList ? (
            <>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Already Added
            </>
          ) : (
            <>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add to List
            </>
          )}
        </button>
      </div>
    </div>
  );
}