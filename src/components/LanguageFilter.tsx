import {useState} from "react";

interface Props {
    languages: string[],
    selectedLanguage: string | null,
    onSelectedLanguage: (language: string | null) => void
}
export const LanguageFilter = ({languages, selectedLanguage, onSelectedLanguage} : Props) => {
    const [isOpen, setIsOpen] = useState(false);
    return <div className="language-filter"
    onClick={() => {setIsOpen(!isOpen)}}>
        {isOpen ?
            <ul>
                {languages.map(language => (
                    <li key={language} onClick={() => onSelectedLanguage(language)}>{language}</li>
                ))}
            </ul>
        :
            <div>
                {selectedLanguage ? ` Selected language: ${selectedLanguage}` : 'Filter by language'}
            </div>
        }
        <button onClick={() => onSelectedLanguage(null)}>Clear</button>
    </div>
}