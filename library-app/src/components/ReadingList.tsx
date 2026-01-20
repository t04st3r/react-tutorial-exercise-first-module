import { useState } from 'react';
import type { ReadingListItem as ReadingListItemType } from '../types/books';
import ReadingListItem from './ReadingListItem';
import './ReadingList.scss';

interface ReadingListProps {
  items: ReadingListItemType[];
  onUpdateStatus: (bookId: string, status: ReadingListItemType['status']) => void;
  onUpdatePage: (bookId: string, page: number) => void;
  onRemove: (bookId: string) => void;
  onBookClick: (book: Book) => void;
}

const ReadingList = ({ items, onUpdateStatus, onUpdatePage, onRemove, onBookClick }: ReadingListProps) => {
  const [filter, setFilter] = useState<'all' | 'to-read' | 'reading' | 'completed'>('all');

  // Filtrowanie elementów
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className="reading-list-section">
      <h3>Your Reading List</h3>
      
      <div className="reading-list-tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'to-read' ? 'active' : ''} onClick={() => setFilter('to-read')}>To Read</button>
        <button className={filter === 'reading' ? 'active' : ''} onClick={() => setFilter('reading')}>Reading</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <div className="reading-list-content">
        {filteredItems.length === 0 ? (
          <p>No books with this status.</p>
        ) : (
          filteredItems.map(item => (
            <ReadingListItem 
              key={item.book.id}
              item={item}
              onUpdateStatus={onUpdateStatus}
              onUpdatePage={onUpdatePage}
              onRemove={onRemove}
              onClick={() => onBookClick(item.book)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReadingList;
