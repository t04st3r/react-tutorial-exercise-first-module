interface LanguageFilterProps {
    languages: Set<string>;
    selectedLanguage: string;
    onSelectLanguage: (language: string) => void;
}


export function LanguageFilter ({languages, selectedLanguage, onSelectLanguage}: LanguageFilterProps) {
    return (
        <div className="language-filter-panel">
            <h2>Language Filter List</h2>
            <div className="language-filter-list">
                <button
                    key="All"
                    className={selectedLanguage === 'all' ? "selected-language-filter-button": "language-filter-button"}
                    onClick={() => onSelectLanguage("all")}>
                    All
                </button>
                {[...languages].map((language) => (
                    <button
                        key={language}
                        className={selectedLanguage === language ? "selected-language-filter-button": "language-filter-button"}
                        onClick={() => onSelectLanguage(language)}>
                        {language}
                    </button>
                ))}
            </div>
        </div>
    );
}