import {useEffect, useState} from 'react'
import './App.css'
import type {Book} from "./types/book.ts";
import BookList from "./components/BookList.tsx";
import InputField from "./components/SearchBar.tsx";
import ReadingList from "./components/ReadingList.tsx";

function App() {
    const [books, setBooks] = useState<Book[] | null>(null);
    const [userInput, setUserInput] = useState<string>('');
    const [readingList, setReadingList] = useState<Book[] | null>(null);


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

    return (
        <>
            <ReadingList items={readingList} onUpdateItem={}/>
            {books ? <BookList
                books={books}
                onAddToList={false}
                readingList={[]}
            /> :
            <div>{`No book with title ${userInput} found. Try a different book`}</div>
            }
        </>
    )
}

export default App
