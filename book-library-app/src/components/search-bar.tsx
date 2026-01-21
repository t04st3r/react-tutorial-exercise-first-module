interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}


export function SearchBar ({ value, onChange, onSubmit }: SearchBarProps) {
    return (
        <div className="search-bar">
            <h2>Book Search</h2>
            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Book search..."
                className="search-input"
            />
            <button onClick={() => onSubmit()} className="search-button">
                Search
            </button>
        </div>
    );
}