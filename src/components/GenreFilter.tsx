interface GenreFilterProps {
  genres: string[];
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
}

const GenreFilter = ({genres, selectedGenre, onSelectGenre}: GenreFilterProps) => {
  return (
    <div>
      <button onClick={() => onSelectGenre(null)}>
        All {selectedGenre === null && '✓'}
      </button>

      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onSelectGenre(genre)}
        >
          {genre} {selectedGenre === genre && '✓'}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;