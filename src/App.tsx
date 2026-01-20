import {useEffect, useState} from 'react'
import './App.css'
import type {Book} from "./types/book.ts";
import BookCard from "./components/BookCard.tsx";

function App() {
    const [books, setBooks] = useState<Book[] | null>(null);
    const [userInput, setUserInput] = useState<string>('');

    useEffect(() => {
      fetch('https://openlibrary.org/search.json?q=harrypotter&limit=20')
         .then((response) => response.json())
         .then((data) => {
            // console.log(data);
            setBooks(data.docs);
         })
         .catch((err) => {
            console.log(err.message);
         });
    }, []);

    if (!books) {
        return <div>{`No book with title ${userInput} found. Try a different book`}</div>;
    }

    console.log(books)

    return (
      <>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))}
    </>
    )
}

export default App
