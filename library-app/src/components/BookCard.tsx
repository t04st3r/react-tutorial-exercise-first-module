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
    <div className="book-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Book Cover */}
      <div className="relative aspect-[2/3] bg-gray-100">
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
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
          {book.title}
        </h3>

        <p className="text-sm text-gray-600 mb-2">
          {book.author}
        </p>

        <p className="text-xs text-gray-500 mb-4">
          {book.publishedYear > 0 ? book.publishedYear : 'Year unknown'}
        </p>

        {/* Action Button */}
        <button
          onClick={handleAddClick}
          disabled={isInReadingList || isLoading}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
            isInReadingList
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          } ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
          aria-label={isInReadingList ? 'Book already in reading list' : 'Add book to reading list'}
        >
          {isLoading ? 'Adding...' : isInReadingList ? 'Already Added' : 'Add to List'}
        </button>
      </div>
    </div>
  );
}