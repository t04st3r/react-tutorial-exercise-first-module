interface Props {
    languages: string[];
    selectedLanguage: string | null;
    onSelectedLanguage: (language: string | null) => void;
}

export const LanguageFilter = ({
                                   languages,
                                   selectedLanguage,
                                   onSelectedLanguage,
                               }: Props) => {
    return (
        <div className="language-filter">
            <select
                value={selectedLanguage ?? ''}
                onChange={(e) =>
                    onSelectedLanguage(e.target.value || null)
                }
            >
                <option value="">Filter by language</option>

                {languages.map((language) => (
                    <option key={language} value={language}>
                        {language}
                    </option>
                ))}
            </select>

            <button onClick={() => onSelectedLanguage(null)}>
                Clear
            </button>
        </div>
    );
};
