import './LanguageFilter.scss';

interface LanguageFilterProps {
    languages: string[];
    selectedLanguage: string | null;
    onSelectLanguage: (language: string | null) => void;
}

const LanguageFilter = ({ languages, selectedLanguage, onSelectLanguage }: LanguageFilterProps) => {
    return (
        <div className="language-filter">
            <button
                className={`language-filter__button ${selectedLanguage === null ? 'language-filter__button--active' : ''}`}
                onClick={() => onSelectLanguage(null)}
            >
                All
            </button>
            {languages.map((language) => (
                <button
                    key={language}
                    className={`language-filter__button ${selectedLanguage === language ? 'language-filter__button--active' : ''}`}
                    onClick={() => onSelectLanguage(language)}
                >
                    {language}
                </button>
            ))}
        </div>
    );
};

export default LanguageFilter;
