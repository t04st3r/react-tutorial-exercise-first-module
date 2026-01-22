import './App.css'

import { useState } from "react";

import BookList from './components/BookList';
import LanguageFilter from './components/LanguageFilter';
import SearchBar from './components/SearchBar'
import type { Book } from "./types/book";
import { ALL_LANGUAGES, lookUpBook } from './utils/book'

function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const handleSearch = async (input: string) => {
    const results = await lookUpBook(input);
    setSearchResults(results);
    setSelectedLanguage(null);
  }

  const languages = new Set<string>(searchResults.map(book => book.language));

  const handleSelectLanguage = (e: React.MouseEvent) => {
    const language = (e.target as HTMLInputElement).name;
    setSelectedLanguage(language === ALL_LANGUAGES ? null : language);
  }

  const visibleSearchResults = searchResults.filter(
    book => selectedLanguage === null || book.language === selectedLanguage
  )

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <LanguageFilter
        languages={languages}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={handleSelectLanguage}
      />
      <BookList books={visibleSearchResults} />
    </>
  )
}

export default App
