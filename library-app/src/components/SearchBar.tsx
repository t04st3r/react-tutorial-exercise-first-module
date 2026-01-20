import React from 'react';
import './SearchBar.scss';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

const SearchBar = ({ value, onChange, onSubmit }: SearchBarProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                className="search-bar__input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search for books..."
            />
            <button type="submit" className="search-bar__button">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
