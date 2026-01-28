import {useState} from 'react'
import './App.css'
import type {Book, ReadingListItem} from "./types/book.ts";
import BookList from "./components/BookList.tsx";
import SearchBar from "./components/SearchBar.tsx";
import ReadingList from "./components/ReadingList.tsx";
import GenreFilter from "./components/GenreFilter.tsx";

function App() {
    const [books, setBooks] = useState<Book[] | null>(null);
    const [userInput, setUserInput] = useState<string>('');
    const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    async function handleFetch() {
        if (!userInput) return;

        try {
            const res = await fetch(`https://openlibrary.org/search.json?q=${userInput}&limit=10`);
            const data = await res.json();
            setBooks(data.docs);
        } catch (error) {
            console.log(error);
        }
    }

    function addToReadingList(book: Book) {
        const newItem: ReadingListItem = {
            book,
            status: 'to-read',
            currentPage: 0,
            dateAdded: new Date().toISOString()
        };
        setReadingList(prev => [...prev, newItem]);
    }

    function removeFromReadingList(bookId: string) {
        setReadingList(prev => prev.filter(item => item.book.id !== bookId));
    }

    function updateReadingListItem(bookId: string, updates: Partial<ReadingListItem>) {
        setReadingList(prev =>
            prev.map(item =>
                item.book.id === bookId ? {...item, ...updates} : item
            )
        );
    }

    const genres = books ? Array.from(new Set(books.map(book => book.genre))) : [];
    const filteredBooks = selectedGenre ? books?.filter(book => book.genre === selectedGenre) || [] : books;

    return (
        <div className="app">
            <h1>Book Tracker App</h1>

            <SearchBar value={userInput} onChange={setUserInput} onSubmit={handleFetch}/>

            {books && books.length > 0 && (
                <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre}/>
            )}

            {filteredBooks && filteredBooks.length > 0 ? (
                <BookList books={filteredBooks} onAddToList={addToReadingList} readingList={readingList}/>
            ) : userInput && books ? (
                <div>No books found. Try a different search.</div>
            ) : null}

            <h2>My Reading List</h2>
            <ReadingList items={readingList} onUpdateItem={updateReadingListItem} onRemoveItem={removeFromReadingList}/>
        </div>
    );
}

export default App;