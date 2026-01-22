import { useState } from 'react';

import { SearchBar } from './components/search-bar';
import { LanguageFilter } from './components/language-filter';
import { BookList } from './components/book-list';
import { ReadingList } from './components/reading-list'

import type { iBook } from "./types/book.ts";
import { Book } from "./types/book.ts";
import {ReadingStats} from "./components/reading-stats.tsx";


const bookLibrarySearchApi = import.meta.env.VITE_BOOK_LIBRARY_SEARCH_API_URL;
const bookLibrarySearchLimit = import.meta.env.VITE_BOOK_LIBRARY_SEARCH_LIMIT;


function App() {
    const [searchCriteria, setSearchCriteria] = useState<string>('');
    const [books, setBooks] = useState<Array<iBook>>([]);
    const [filteredBooks, setFilteredBooks] = useState<Array<iBook>>([]);
    const [languages, setLanguages] = useState<Set<string>>(new Set());
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
    const [readingList, setReadingList] = useState<Array<iBook>>([]);
    const [activeTab, setActiveTab] = useState<'library' | 'reading-list'>('library');

    async function fetchBooks() {
        try {
            const apiUrl = `${bookLibrarySearchApi}?q=${searchCriteria}&limit=${bookLibrarySearchLimit}`;
            const response = await fetch(apiUrl);
            const jsonResponse = await response.json();
            const jsonBooks = jsonResponse.docs;

            console.log(jsonResponse);

            const retrievedLanguages: Set<string> = new Set();
            const retrievedBooks: Array<iBook> = [];

            jsonBooks.map((jsonBook) => {
                retrievedBooks.push(
                    new Book(
                        jsonBook.key,
                        jsonBook.title,
                        jsonBook.author_name[0],
                        `${jsonBook.title}(${jsonBook.author_name[0]})[${jsonBook.first_publish_year}]`,
                        jsonBook.cover_i,
                        jsonBook.first_publish_year,
                        jsonBook.language[0],
                        jsonBook.edition_count  // Wrong but better than nothing...
                    )
                );
                retrievedLanguages.add(jsonBook.language[0]);
            });

            setBooks(retrievedBooks);
            setFilteredBooks(retrievedBooks);
            setLanguages(retrievedLanguages);

        } catch (error) {
            console.error(error);
            setBooks([]);
            setFilteredBooks([]);
        }
    }

    function filterBooksByLanguage(language: string) {
        setSelectedLanguage(language);
        setFilteredBooks(() => {
            if (language === 'all') {
                return books;
            }
            return books.filter((book) => book.language === language);
        });
    }

    function updateBookStatus(book: iBook) {
        setReadingList(
            readingList.map((readingBook: iBook) =>
                readingBook.id === book.id ? book : readingBook
            )
        )
    }

    function addToReadingList(book: iBook) {
        setReadingList([...readingList, book]);
    }

    function removeFromReadingList(book: iBook) {
        setReadingList(
            readingList.filter((readingBook: iBook) =>
                readingBook.id !== book.id
            )
        )
    }

    return (
        <div className="app">
            <h1>Book Library App</h1>
            
            <div className="tab-navigation">
                <button 
                    className={`tab-button ${activeTab === 'library' ? 'active' : ''}`}
                    onClick={() => setActiveTab('library')}
                >
                    Book Library
                </button>
                <button 
                    className={`tab-button ${activeTab === 'reading-list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reading-list')}
                >
                    Reading List
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'library' && (
                    <div className="book-library">
                        <div className="tools-panel">
                            <SearchBar value={searchCriteria} onChange={setSearchCriteria} onSubmit={fetchBooks} />
                            <LanguageFilter languages={languages} selectedLanguage={selectedLanguage} onSelectLanguage={filterBooksByLanguage} />
                        </div>
                        <BookList books={filteredBooks} readingList={readingList} onAddToList={addToReadingList}/>
                    </div>
                )}

                {activeTab === 'reading-list' && (
                    <div className="book-reading-list">
                        <ReadingList readingList={readingList} onBookStatusUpdate={updateBookStatus} onRemoveFromList={removeFromReadingList} />
                        <ReadingStats readingList={readingList} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;