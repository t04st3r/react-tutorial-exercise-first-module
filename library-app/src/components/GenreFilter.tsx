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
    <div className="w-full">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Filter by Genre
      </h3>

      <div className="flex flex-wrap gap-2">
        {/* "All" button */}
        <button
          onClick={() => handleGenreClick(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            isSelected(null)
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          aria-pressed={isSelected(null)}
          aria-label="Show all genres"
        >
          <span className="flex items-center gap-1.5">
            All
            {getCount(null) !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                isSelected(null) ? 'bg-blue-500' : 'bg-gray-200'
              }`}>
                {getCount(null)}
              </span>
            )}
          </span>
        </button>

        {/* Genre filter buttons */}
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isSelected(genre)
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            aria-pressed={isSelected(genre)}
            aria-label={`Filter by ${genre}`}
          >
            <span className="flex items-center gap-1.5">
              {genre}
              {getCount(genre) !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  isSelected(genre) ? 'bg-blue-500' : 'bg-gray-200'
                }`}>
                  {getCount(genre)}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Active filter indicator */}
      {selectedGenre && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="h-4 w-4"
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
          <span>
            Filtering by: <strong>{selectedGenre}</strong>
            {getCount(selectedGenre) !== undefined && (
              <span className="text-gray-500"> ({getCount(selectedGenre)} books)</span>
            )}
          </span>
          <button
            onClick={() => handleGenreClick(null)}
            className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
            aria-label="Clear genre filter"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}