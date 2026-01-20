import {useEffect, useState} from 'react'
import './App.css'
import type {Book} from "./types/book.ts";
import BookList from "./components/BookList.tsx";
import InputField from "./components/SearchBar.tsx";

function App() {
    const [books, setBooks] = useState<Book[] | null>(null);
    const [userInput, setUserInput] = useState<string>('');

    // useEffect(() => {
    //   fetch(`https://openlibrary.org/search.json?q=${userInput}&limit=10`)
    //      .then((response) => response.json())
    //      .then((data) => {
    //         // console.log(data);
    //         setBooks(data.docs);
    //      })
    //      .catch((err) => {
    //         console.log(err.message);
    //      });
    // }, [userInput]);


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
            <InputField
                value={userInput}
                onChange={setUserInput}
                onSubmit={handleFetch}
            />
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
