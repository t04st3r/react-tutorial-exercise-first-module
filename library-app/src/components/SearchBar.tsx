import type { FormEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSearching?: boolean;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  isSearching = false,
  placeholder = 'Search by title, author, or subject...'
}: SearchBarProps) {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={isSearching}
            aria-label="Search books"
          />
        </div>

        <button
          type="submit"
          disabled={isSearching || !value.trim()}
          className="search-button"
          aria-label="Submit search"
        >
          {isSearching ? (
            <>
              <svg
                className="spinner"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Searching...
            </>
          ) : (
            'Search'
          )}
        </button>
      </form>
    </div>
  );
}