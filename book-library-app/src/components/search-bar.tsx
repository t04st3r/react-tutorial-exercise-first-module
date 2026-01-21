import * as React from "react";


interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}


function SearchBar ({ value, onChange, onSubmit }: SearchBarProps) {
    return (
        <div className="search-bar">
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