import { useState } from 'react';
import './App.css';
import { getBooks } from './utils/books';
import type { Book, ReadingListItem } from './types/books';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import LanguageFilter from './components/LanguageFilter';
import ReadingList from './components/ReadingList';
import BookDetail from './components/BookDetail';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const allLanguages = books.map(b => b.language).filter(Boolean);
  const uniqueLanguages = new Set(allLanguages);
  const languages = Array.from(uniqueLanguages).sort();

  let filteredBooks = books;
  if (selectedLanguage) {
    filteredBooks = books.filter(book => book.language === selectedLanguage);
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setSelectedLanguage(null);
    
    try {
      const results = await getBooks(searchQuery);
      setBooks(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToReadingList = (book: Book) => {
    if (readingList.some(item => item.book.id === book.id)) return;
    
    const newItem: ReadingListItem = {
      book,
      status: 'to-read',
      currentPage: 0,
      dateAdded: new Date().toISOString()
    };
    
    setReadingList([...readingList, newItem]);
  };

  const removeFromReadingList = (bookId: string) => {
    const newList = readingList.filter(item => item.book.id !== bookId);
    setReadingList(newList);
  };

  const updateReadingStatus = (bookId: string, status: ReadingListItem['status']) => {
    const newList = readingList.map(item => 
      item.book.id === bookId ? { ...item, status } : item
    );
    setReadingList(newList);
  };

  const updateCurrentPage = (bookId: string, page: number) => {
    const newList = readingList.map(item => 
      item.book.id === bookId ? { ...item, currentPage: page } : item
    );
    setReadingList(newList);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Library</h1>
      </header>
      
      <main>
        <div className="controls-section">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
          />
          
          {languages.length > 0 && (
            <LanguageFilter 
              languages={languages}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
            />
          )}
        </div>

        {readingList.length > 0 && (
          <ReadingList 
            items={readingList}
            onUpdateStatus={updateReadingStatus}
            onUpdatePage={updateCurrentPage}
            onRemove={removeFromReadingList}
            onBookClick={setSelectedBook}
          />
        )}

        {isLoading ? (
          <div className="loading-spinner">Loading books...</div>
        ) : (
          <BookList 
            books={filteredBooks}
            onAddToList={addToReadingList}
            readingList={readingList}
            onBookClick={setSelectedBook}
          />
        )}

        {selectedBook && (
          <BookDetail 
            book={selectedBook}
            readingListItem={readingList.find(item => item.book.id === selectedBook.id)}
            onClose={() => setSelectedBook(null)}
            onAdd={addToReadingList}
            onRemove={removeFromReadingList}
            onUpdateStatus={updateReadingStatus}
            onUpdatePage={updateCurrentPage}
          />
        )}
      </main>
    </div>
  );
}

export default App;
