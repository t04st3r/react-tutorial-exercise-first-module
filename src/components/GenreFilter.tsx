interface GenreFilterProps {
  genres: string[];
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
}

const GenreFilter = ({genres, selectedGenre, onSelectGenre}: GenreFilterProps) => {
  return (
    <div className="genre-filter">
      <button
        className={selectedGenre === null ? 'active' : ''}
        onClick={() => onSelectGenre(null)}
      >
        All {selectedGenre === null && '✓'}
      </button>

      {genres.map((genre) => (
        <button
          key={genre}
          className={selectedGenre === genre ? 'active' : ''}
          onClick={() => onSelectGenre(genre)}
        >
          {genre} {selectedGenre === genre && '✓'}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;