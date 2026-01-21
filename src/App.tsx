import './App.css'
import { useState } from "react";
import BookList from './components/BookList';
import SearchBar from './components/SearchBar'
import type { Book } from "./types/book";
import { lookUpBook } from './utils/book'

function App() {
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const searchByTitle = async (input: string) => {
    const results = await lookUpBook(input);
    setSearchResults(results);
  }

  return (
    <>
      <SearchBar onSubmit={searchByTitle} />
      <BookList books={searchResults} />
    </>
  )
}

export default App
