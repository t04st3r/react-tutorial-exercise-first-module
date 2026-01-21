interface ReadingListProps {
  items: string;
  onUpdateItem: (value: string) => void;
  onRemoveItem?: () => void;
}

function ReadingList({ items, onUpdateItem, onRemoveItem }: ReadingListProps) {
  return (
    <div className="input-group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Book title"
        className="url-input"
      />
      <button onClick={onSubmit} className="fetch-button">
        Search Books
      </button>
    </div>
  );
}

export default ReadingList;