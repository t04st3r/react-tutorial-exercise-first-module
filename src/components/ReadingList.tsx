import type {Book} from "../types/book.ts";

interface ReadingListProps {
  items: Book[];
  onUpdateItem: (value: string) => void;
  onRemoveItem?: () => void;
}

export default function ReadingList({ items, onUpdateItem, onRemoveItem }: ReadingListProps) {
  return (
    <div className="reading-list">
      <h1>My reading list: {items.map((book) => (
                <p key={book.id}>Title: <i>{book.title}</i></p>))}
      </h1>
    </div>
  );
}
