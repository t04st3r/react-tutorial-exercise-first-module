import type { ReadingListItem } from "../types/readingList"
import { getCoverImageUrl } from "../utils/book";

interface ReadingListCardProps {
  item: ReadingListItem,
  onRemoveItem: (item: ReadingListItem) => void,
}

const ReadingListCard = ({ item, onRemoveItem }: ReadingListCardProps) => {
  const coverImageUrl = getCoverImageUrl(item.book.coverImage, 'S');

  const handleRemoveItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemoveItem(item);
  }

  // TODO: buttons
  return (
    <div className="card">
      <img src={coverImageUrl} />
      <p><b>{item.book.title}</b> by {item.book.author} ({item.status})</p>
      <p>Added on {item.dateAdded}</p>
      <div className="card-controls">
        <button onClick={handleRemoveItem}>Remove</button>
      </div>
    </div>
  )
}

export default ReadingListCard;
