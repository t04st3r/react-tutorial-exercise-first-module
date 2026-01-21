interface GenreFilterProps {
  genres: string[];
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
  genreCounts?: Record<string, number>;
  totalCount?: number;
}

export function GenreFilter({
  genres,
  selectedGenre,
  onSelectGenre,
  genreCounts,
  totalCount
}: GenreFilterProps) {
  const handleGenreClick = (genre: string | null) => {
    onSelectGenre(genre);
  };

  const isSelected = (genre: string | null): boolean => {
    return selectedGenre === genre;
  };

  const getCount = (genre: string | null): number | undefined => {
    if (!genreCounts) return undefined;
    if (genre === null) return totalCount;
    return genreCounts[genre];
  };

  return (
    <div className="genre-filter">
      <h3 className="filter-title">Filter by Genre</h3>

      <div className="filter-chips">
        <button
          onClick={() => handleGenreClick(null)}
          className={`chip ${isSelected(null) ? 'active' : ''}`}
          aria-pressed={isSelected(null)}
          aria-label="Show all genres"
        >
          All
          {getCount(null) !== undefined && (
            <span className="count">{getCount(null)}</span>
          )}
        </button>

        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`chip ${isSelected(genre) ? 'active' : ''}`}
            aria-pressed={isSelected(genre)}
            aria-label={`Filter by ${genre}`}
          >
            {genre}
            {getCount(genre) !== undefined && (
              <span className="count">{getCount(genre)}</span>
            )}
          </button>
        ))}
      </div>

      {selectedGenre && (
        <div className="active-filter">
          <span>
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filtering by: <strong>{selectedGenre}</strong>
            {getCount(selectedGenre) !== undefined && (
              <span> ({getCount(selectedGenre)} books)</span>
            )}
          </span>
          <button
            onClick={() => handleGenreClick(null)}
            className="clear-button"
            aria-label="Clear genre filter"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}