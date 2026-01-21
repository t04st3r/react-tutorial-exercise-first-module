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
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Prevent body scroll when modal is open
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                className="w-full rounded-lg shadow-lg"
              />

              {!isInReadingList && onAddToList && (
                <button
                  onClick={() => onAddToList(book)}
                  className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add to Reading List
                </button>
              )}

              {isInReadingList && readingListItem && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    In Your Reading List
                  </div>
                  <div className="text-sm text-green-600">
                    Status: <span className="font-medium capitalize">{readingListItem.status.replace('-', ' ')}</span>
                  </div>
                  {book.pageCount > 0 && (
                    <div className="mt-2">
                      <div className="text-sm text-green-600 mb-1">
                        Progress: {readingListItem.currentPage} / {book.pageCount} pages ({Math.round(progress)}%)
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Book Information */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600">by {book.author}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Published Year</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {book.publishedYear > 0 ? book.publishedYear : 'Unknown'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Genre</p>
                  <p className="text-lg font-semibold text-gray-900">{book.genre}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Page Count</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {book.pageCount > 0 ? book.pageCount.toLocaleString() : 'Unknown'}
                  </p>
                </div>
                {readingListItem && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Added On</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(readingListItem.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>

              {readingListItem && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">Reading Information</h3>
                  <div className="space-y-1 text-sm text-blue-700">
                    <p>Status: <span className="font-medium capitalize">{readingListItem.status.replace('-', ' ')}</span></p>
                    <p>Current Page: <span className="font-medium">{readingListItem.currentPage}</span></p>
                    {book.pageCount > 0 && (
                      <p>Pages Remaining: <span className="font-medium">{book.pageCount - readingListItem.currentPage}</span></p>
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