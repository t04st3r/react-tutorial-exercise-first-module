import type React from "react";

import { ALL_LANGUAGES } from "../utils/book";

interface LanguageFilterProps {
  languages: Set<string>,
  selectedLanguage: string | null,
  onSelectLanguage: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const LanguageFilter = ({ languages, selectedLanguage, onSelectLanguage }: LanguageFilterProps) => {
  const languageLabels =
    languages.size === 0
      ? []
      : [ALL_LANGUAGES].concat(Array.from(languages).sort());

  const isSelected = (language: string): boolean => {
    const otherLanguage = (selectedLanguage === null ? ALL_LANGUAGES : selectedLanguage);
    return language === otherLanguage;
  }

  // TODO
  return (
    <>
      {languageLabels.map(language =>
        <button key={language} className={isSelected(language) ? 'active' : ''} name={language} onClick={onSelectLanguage}>
          {language.toUpperCase()}
        </button>
      )}
    </>
  )
};

export default LanguageFilter;
