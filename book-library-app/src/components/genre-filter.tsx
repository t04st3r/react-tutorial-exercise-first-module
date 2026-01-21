interface GenreFilterProps {
    genres: Array<string>;
    selectedGenre: string;
    onSelectGenre: (genre: string) => void;
}


function GenreFilter ({genres, selectedGenre, onSelectGenre}: GenreFilterProps) {
    return (
        <div className="genre-filter-panel">
            <h2>Book List</h2>
            <div className="genre-filter-list">
                <button
                    key="All"
                    className="genre-filter-button"
                    onClick={() => onSelectGenre("all")}>
                    "All"
                </button>
                {genres.map((genre) => (
                    <button
                        key={genre}
                        className={selectedGenre === genre ? "selected-genre-filter-button": "genre-filter-button"}
                        onClick={() => onSelectGenre(genre)}>
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
}