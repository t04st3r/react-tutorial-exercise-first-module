import type { ReadingListItem as ReadingListItemType } from '../types/books';
import './ReadingListItem.scss';

interface ReadingListItemProps {
  item: ReadingListItemType;
  onUpdateStatus: (bookId: string, status: ReadingListItemType['status']) => void;
  onUpdatePage: (bookId: string, page: number) => void;
  onRemove: (bookId: string) => void;
  onClick: () => void;
}

const ReadingListItem = ({ item, onUpdateStatus, onUpdatePage, onRemove, onClick }: ReadingListItemProps) => {
  const { book, status, currentPage } = item;
  
  const progressPercent = Math.round((currentPage / book.pageCount) * 100);

  return (
    <div className="reading-list-item">
      <div className="reading-list-item__info" onClick={onClick} style={{ cursor: 'pointer' }}>
        <strong>{book.title}</strong>
        <span> by {book.author}</span>
      </div>

      <div className="reading-list-item__status">
        <select 
          value={status} 
          onChange={(e) => onUpdateStatus(book.id, e.target.value as ReadingListItemType['status'])}
        >
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="reading-list-item__progress">
        <button onClick={() => onUpdatePage(book.id, Math.max(0, currentPage - 1))}>-</button>
        <span> {currentPage} / {book.pageCount} pages </span>
        <button onClick={() => onUpdatePage(book.id, Math.min(book.pageCount, currentPage + 1))}>+</button>
        
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span>{progressPercent}%</span>
      </div>

      <button onClick={() => onRemove(book.id)} className="remove-btn">Remove</button>
    </div>
  );
};

export default ReadingListItem;
