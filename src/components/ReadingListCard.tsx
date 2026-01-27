import type { ReadingListItem } from "../types/readingList"
import { getCoverImageUrl } from "../utils/book";

interface ReadingListCardProps {
  item: ReadingListItem,
  onUpdateItem: (item: ReadingListItem) => void,
  onRemoveItem: (item: ReadingListItem) => void,
}

const ReadingListCard = ({ item, onUpdateItem, onRemoveItem }: ReadingListCardProps) => {
  const coverImageUrl = getCoverImageUrl(item.book.coverImage, 'S');

  const handleRemoveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemoveItem(item);
  }

  const handleUpdateItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onUpdateItem(item);
  }

  // TODO: buttons
  return (
    <div className="card">
      <img src={coverImageUrl} />
      <p><b>{item.book.title}</b> by {item.book.author} ({item.status})</p>
      <p>Added on {item.dateAdded}</p>
      <div className="card-controls">
        {item.status == 'to-read' && <button onClick={handleUpdateItem}>Start reading</button>}
        {item.status == 'reading' && <button onClick={handleUpdateItem}>Mark as completed</button>}
        <button onClick={handleRemoveItem}>Remove</button>
      </div>
    </div>
  )
}

export default ReadingListCard;
