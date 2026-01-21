import { useState } from 'react';

import { SearchBar } from './components/search-bar';
import { LanguageFilter } from './components/language-filter';
import { BookList } from './components/book-list';

import type { iBook } from "./types/book.ts";
import { Book } from "./types/book.ts";



const bookLibrarySearchApi = import.meta.env.VITE_BOOK_LIBRARY_SEARCH_API_URL;
const bookLibrarySearchLimit = import.meta.env.VITE_BOOK_LIBRARY_SEARCH_LIMIT;


function App() {
    const [searchCriteria, setSearchCriteria] = useState<string>('');
    const [books, setBooks] = useState<Array<iBook>>([]);
    const [languages, setLanguages] = useState<Set<string>>(new Set());
    const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
    const [readingList, setReadingList] = useState<Array<iBook>>([]);

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
            setLanguages(retrievedLanguages);

        } catch (error) {
            console.error(error);
            setBooks([]);
        }
    }

    function onAddToReadingList(book: iBook) {
        setReadingList([...readingList, book]);
    }

    return (
        <div className="app">
            <h1>Book Library App</h1>
            <div className="tools-panel">
                <SearchBar value={searchCriteria} onChange={setSearchCriteria} onSubmit={fetchBooks} />
                <LanguageFilter languages={languages} selectedLanguage={selectedLanguage} onSelectLanguage={setSelectedLanguage} />
            </div>
            <BookList books={books} readingList={readingList} onAddToList={onAddToReadingList}/>
        </div>
    );
}

export default App;