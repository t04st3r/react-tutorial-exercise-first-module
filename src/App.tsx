import {useEffect, useState} from 'react'
import './App.scss'

import { fetchBooks } from './api/books';
import {ReadingList} from "./components/ReadingList.tsx";
import {BookList} from "./components/BookList.tsx";
import {LanguageFilter} from "./components/LanguageFilter.tsx";
import {SearchBar} from "./components/SearchBar.tsx";
import type {Book, ReadingListItem} from "./types/book.ts";
import {ReadingStats} from "./components/ReadingStats.tsx";
import {BookInfoModal} from "./components/BookInfoModal.tsx";

function App() {
  const [SearchBarValue, setSearchBarValue] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
  const [selectedPage, setSelectedPage] = useState<'search' | 'readlist' | 'stats'>('search');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const languages = ['en', 'rus', 'cat', 'pol']
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  useEffect(() => {
      const getBooks = async () => {
          const books = await fetchBooks("")
          setBooks(books)
      }
      getBooks()
  }, [])

  const submitSearch = async (search: string) => {
      const books = await fetchBooks(search)
      setBooks(books)
  }
  const addToReadList = (book: Book) => {
      if(readingList.some((readingListItem) => readingListItem.book.id === book.id)) {
          return;
      }
      const today = new Date().toISOString();
      setReadingList([...readingList,
          {
              book: book,
              status: "to-read",
              currentPage: 0,
              dateAdded: today
          }]);
  }
  const updateListItem = (newItem: ReadingListItem, id: string) => {
      const readingListCopy = [...readingList];
      for (const i in readingListCopy) {
          if (readingListCopy[i].book.id === id) {
              readingListCopy[i] = newItem;
          }
      }
      setReadingList(readingListCopy)
  }
  const selectLanguage = (language: string | null) => {
      setSelectedLanguage(language);
  }
  const removeListItem = (id: string) => {
      const readingListFiltered = [...readingList].filter((item) => item.book.id !== id);
      setReadingList(readingListFiltered)
  }
  return (
      <div className="main-container">
          <div className="menu-buttons">
              <button className={`${selectedPage == "search" ? "selected" : ""}`}
                      onClick={() => setSelectedPage('search')}>Search</button>
              <button className={`${selectedPage == "readlist" ? "selected" : ""}`}
                      onClick={() => setSelectedPage('readlist')}>Your Readlist</button>
              <button className={`${selectedPage == "stats" ? "selected" : ""}`}
                      onClick={() => setSelectedPage('stats')}>Your Read stats</button>
          </div>
          {selectedPage === 'search' &&
              <div className="search-container">
                  <SearchBar
                      value={SearchBarValue}
                      onChange={(new_value) => setSearchBarValue(new_value)}
                      onSubmit={async () => {
                          await submitSearch(SearchBarValue)
                      }}/>
                  <div className="results">
                      <LanguageFilter languages={languages} selectedLanguage={selectedLanguage} onSelectedLanguage={selectLanguage}/>
                      <BookList
                          books={books.filter((book) => {
                              if (selectedLanguage == null)
                                  return true
                              return book.language === selectedLanguage;
                          })}
                          onAddToList={addToReadList}
                          readingList={readingList}
                          setSelectedBook={setSelectedBook}
                      />
                  </div>
              </div>
          }
          {selectedPage == 'readlist' &&
              <ReadingList items={readingList}
                           onUpdateItem={updateListItem}
                           onRemoveItem={removeListItem}
                           setSelectedBook={setSelectedBook}/>
          }
          {selectedPage == 'stats' &&
              <ReadingStats readList={readingList}/>
          }
          {selectedBook != null &&
              <BookInfoModal book={selectedBook} closeModal={() => setSelectedBook(null)}/>
          }
      </div>
  )
}

export default App
