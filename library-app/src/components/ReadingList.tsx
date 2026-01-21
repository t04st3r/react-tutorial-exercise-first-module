import { useState, useMemo } from 'react';
import { ReadingListItem as ReadingListItemComponent } from './ReadingListItem';
import type { ReadingListItem } from '../types/reading_list_item';
import type { Book } from '../types/book';

interface ReadingListProps {
  items: ReadingListItem[];
  onUpdateStatus: (bookId: string, status: 'to-read' | 'reading' | 'completed') => void;
  onUpdatePage: (bookId: string, page: number) => void;
  onRemove: (bookId: string) => void;
  onViewDetails?: (book: Book) => void;
}

type FilterStatus = 'all' | 'to-read' | 'reading' | 'completed';

export function ReadingList({ items, onUpdateStatus, onUpdatePage, onRemove, onViewDetails }: ReadingListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return items;
    }
    return items.filter(item => item.status === activeFilter);
  }, [items, activeFilter]);

  // Count items by status
  const counts = useMemo(() => {
    return {
      all: items.length,
      'to-read': items.filter(item => item.status === 'to-read').length,
      reading: items.filter(item => item.status === 'reading').length,
      completed: items.filter(item => item.status === 'completed').length,
    };
  }, [items]);

  const getFilterLabel = (filter: FilterStatus): string => {
    switch (filter) {
      case 'all': return 'All Books';
      case 'to-read': return 'To Read';
      case 'reading': return 'Reading';
      case 'completed': return 'Completed';
    }
  };

  const getEmptyMessage = (filter: FilterStatus): string => {
    switch (filter) {
      case 'all': return 'Your reading list is empty. Start by searching for books and adding them to your list!';
      case 'to-read': return 'No books in your "To Read" list. Mark a book as "To Read" to see it here.';
      case 'reading': return 'You\'re not currently reading any books. Start reading a book to track your progress!';
      case 'completed': return 'You haven\'t completed any books yet. Keep reading!';
    }
  };

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto">
          {(['all', 'to-read', 'reading', 'completed'] as FilterStatus[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeFilter === filter
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {getFilterLabel(filter)}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeFilter === filter
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {counts[filter]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      {filteredItems.length > 0 ? (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <ReadingListItemComponent
              key={item.book.id}
              item={item}
              onUpdateStatus={onUpdateStatus}
              onUpdatePage={onUpdatePage}
              onRemove={onRemove}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {activeFilter === 'all' ? (
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            ) : activeFilter === 'completed' ? (
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            )}
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            {activeFilter === 'all' ? 'No books yet' : `No ${getFilterLabel(activeFilter).toLowerCase()} books`}
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            {getEmptyMessage(activeFilter)}
          </p>
        </div>
      )}
    </div>
  );
}