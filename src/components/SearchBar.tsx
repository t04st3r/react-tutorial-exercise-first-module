interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

function SearchBar({value, onChange, onSubmit}: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="input-group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search for a book..."
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;