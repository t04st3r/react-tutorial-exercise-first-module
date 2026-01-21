import type { SortField, SortOrder } from '../utils/bookSort';

interface SortControlProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
}

export function SortControl({ sortField, sortOrder, onSortChange }: SortControlProps) {
  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortField, sortOrder);
  };

  const handleOrderToggle = () => {
    onSortChange(sortField, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="sort-control">
      <label htmlFor="sort-field" className="sort-label">
        Sort by:
      </label>
      <div className="sort-controls">
        <select
          id="sort-field"
          value={sortField}
          onChange={handleFieldChange}
          className="sort-select"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="year">Year</option>
        </select>
        <button
          onClick={handleOrderToggle}
          className="sort-order-button"
          aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          {sortOrder === 'asc' ? (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}