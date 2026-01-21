

type GenreFilterProps = {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: () => void;
};

export default function GenreFilter({genres, selectedGenre, onSelectGenre}: GenreFilterProps) {

    return (
        <div className='card'>
            <h2>{book.title}</h2>

            {book.cover_i ?
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                     className="book-image" alt="Cover image of the book" /> :
                <p>No image available</p>
            }

            {book.author_name.map((author, idx) => (
                <p key={book.author_key[idx]}>By: <i>{author}</i></p>))}

            { onAddToList ? <p> On your reading list </p> :
                <button> Add to list </button>
            }

        </div>
  )
}