import './App.css'

import { useState } from "react";

import BookList from './components/BookList';
import LanguageFilter from './components/LanguageFilter';
import ReadingList from './components/ReadingList';
import SearchBar from './components/SearchBar'
import type { Book } from "./types/book";
import type { ReadingListItem, ReadStatus } from './types/readingList';
import { ALL_LANGUAGES, lookUpBook } from './utils/book'
import { format } from './utils/dates';

function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);

  const languages = new Set<string>(searchResults.map(book => book.language));

  const visibleSearchResults = searchResults.filter(
    book => selectedLanguage === null || book.language === selectedLanguage
  )

  const handleSearch = async (input: string) => {
    const results = await lookUpBook(input);
    setSearchResults(results);
    setSelectedLanguage(null);
  }

  const handleSelectLanguage = (e: React.MouseEvent) => {
    const language = (e.target as HTMLInputElement).name;
    setSelectedLanguage(language === ALL_LANGUAGES ? null : language);
  }

  const handleAddToReadingList = (book: Book) => {
    const newItem: ReadingListItem = {
      book: book,
      status: 'to-read',
      dateAdded: format(new Date()),
    };
    setReadingList([...readingList, newItem]);
  }

  const handleRemoveFromReadingList = (item: ReadingListItem) => {
    const updatedReadingList = readingList.filter(current => item.book.id !== current.book.id);
    setReadingList(updatedReadingList);
  }

  const handleUpdateReadingStatus = (item: ReadingListItem) => {
    const transitionToNextStatus = (readingListItem: ReadingListItem): ReadingListItem => {
      if (readingListItem.status === 'completed') {
        throw new Error('Cannot change the status of a completed book');
      }
      const nextStatus: ReadStatus = readingListItem.status === 'to-read' ? 'reading' : 'completed';
      return { ...readingListItem, status: nextStatus };
    }

    const updatedReadingList = readingList.map(current => {
      return current.book.id === item.book.id ? transitionToNextStatus(current) : current;
    })
    setReadingList(updatedReadingList);
  }

  return (
    <>
      <h1>DEEZ BOOKS</h1>
      <ReadingList
        items={readingList}
        onUpdateItem={handleUpdateReadingStatus}
        onRemoveItem={handleRemoveFromReadingList}
      />
      <SearchBar onSubmit={handleSearch} />
      <LanguageFilter
        languages={languages}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={handleSelectLanguage}
      />
      <BookList
        books={visibleSearchResults}
        onAddToList={handleAddToReadingList}
        readingList={readingList}
      />
    </>
  )
}

export default App
