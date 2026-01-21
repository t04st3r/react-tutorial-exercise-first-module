import { useState } from 'react';
import type { ReadingListItem } from '../types/reading_list_item';
import type { Book } from "../types/book";

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
      case 'to-read': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'reading': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Book Cover */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => onViewDetails?.(book)}>
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="w-20 h-28 object-cover rounded shadow-sm hover:shadow-lg transition-shadow"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onViewDetails?.(book)}>
              <h3 className="font-semibold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 truncate">{book.author}</p>
            </div>
            <button
              onClick={handleRemove}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              aria-label="Remove from reading list"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => handleStatusChange('to-read')}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${
                status === 'to-read' 
                  ? getStatusColor('to-read') 
                  : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
              }`}
            >
              To Read
            </button>
            <button
              onClick={() => handleStatusChange('reading')}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${
                status === 'reading' 
                  ? getStatusColor('reading') 
                  : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Reading
            </button>
            <button
              onClick={() => handleStatusChange('completed')}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition-colors ${
                status === 'completed' 
                  ? getStatusColor('completed') 
                  : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Progress Section */}
          {book.pageCount > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              {/* Page Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecrementPage}
                  disabled={currentPage === 0}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Decrease page"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-1 text-sm">
                  <span className="text-gray-500">Page</span>
                  <input
                    type="number"
                    value={pageInput}
                    onChange={handlePageInputChange}
                    onBlur={handlePageInputBlur}
                    min="0"
                    max={book.pageCount}
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-500">of {book.pageCount}</span>
                </div>

                <button
                  onClick={handleIncrementPage}
                  disabled={currentPage === book.pageCount}
                  className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Increase page"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Expand Button */}
          {book.description && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}

          {/* Expanded Description */}
          {isExpanded && book.description && (
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {book.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}