import type { ReadingListItem } from "../types/readingList";
import ReadingListCard from "./ReadingListCard";

interface ReadingListProps {
  items: ReadingListItem[],
  onUpdateItem: () => void,
  onRemoveItem: (item: ReadingListItem) => void,
}

const ReadingList = ({ items, onUpdateItem, onRemoveItem }: ReadingListProps) => {
  return (
    <div className="reading-list">
      {items.length === 0
        ? <p>Reading list is empty. Add some books!</p>
        : items.map(
          item => <ReadingListCard key={item.book.id} item={item} onRemoveItem={onRemoveItem} />
        )
      }
    </div>
  )
}

export default ReadingList;
