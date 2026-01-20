import { useState } from 'react';
import type { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onAddToList: (book: Book) => void;
  isInReadingList: boolean;
}

export function BookCard({ book, onAddToList, isInReadingList }: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClick = async () => {
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

  return (
    <div className="book-card bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
      {/* Book Cover */}
      <div className="relative aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={imageError ? '/src/assets/placeholder-book-cover.svg' : book.coverImage}
          alt={`Cover of ${book.title}`}
          onError={handleImageError}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Book Details */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-1 min-h-[3rem]">
          {book.title}
        </h3>

        <p className="text-sm text-gray-600 mb-1 truncate">
          {book.author}
        </p>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-500">
            {book.publishedYear > 0 ? book.publishedYear : 'Year unknown'}
          </p>
          {book.genre && book.genre !== 'Unknown' && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {book.genre}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddClick}
          disabled={isInReadingList || isLoading}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
            isInReadingList
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md'
          } ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
          aria-label={isInReadingList ? 'Book already in reading list' : 'Add book to reading list'}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adding...
            </span>
          ) : isInReadingList ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Already Added
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add to List
            </span>
          )}
        </button>
      </div>
    </div>
  );
}