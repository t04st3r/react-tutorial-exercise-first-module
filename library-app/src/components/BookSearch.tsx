import { useState, useMemo } from 'react';
import { searchBooks } from '../utils/bookApi';
import { SearchBar } from './SearchBar';
import { BookList } from './BookList';
import { GenreFilter } from './GenreFilter';
import { ReadingList } from './ReadingList';
import { ReadingStats } from './ReadingStats';
import { BookDetail } from './BookDetail';
import type { Book } from '../types/book';
import type { ReadingListItem } from '../types/reading_list_item';

type View = 'search' | 'reading-list';

export function BookSearch() {
  const [currentView, setCurrentView] = useState<View>('search');
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const availableGenres = useMemo(() => {
    const genreSet = new Set<string>();
    books.forEach((book) => {
      if (book.genre && book.genre !== 'Unknown') {
        genreSet.add(book.genre);
      }
    });
    return Array.from(genreSet).sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    if (!selectedGenre) {
      return books;
    }
    return books.filter((book) => book.genre === selectedGenre);
  }, [books, selectedGenre]);

  const handleSearchSubmit = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsSearching(true);
    setError(null);
    setHasSearched(true);
    setSelectedGenre(null);

    try {
      const results = await searchBooks(query, 20);
      setBooks(results);

      if (results.length === 0) {
        setError('No books found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (error) {
      setError(null);
    }
  };

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  const addToReadingList = (book: Book) => {
    const newItem: ReadingListItem = {
      book,
      status: 'to-read',
      currentPage: 0,
      dateAdded: new Date().toISOString(),
    };

    setReadingList((prev) => [...prev, newItem]);
  };

  const removeFromReadingList = (bookId: string) => {
    setReadingList((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const updateReadingStatus = (bookId: string, newStatus: 'to-read' | 'reading' | 'completed') => {
    setReadingList((prev) =>
      prev.map((item) =>
        item.book.id === bookId
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  const updateCurrentPage = (bookId: string, page: number) => {
    setReadingList((prev) =>
      prev.map((item) =>
        item.book.id === bookId
          ? { ...item, currentPage: page }
          : item
      )
    );
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  const isBookInReadingList = (bookId: string): boolean => {
    return readingList.some((item) => item.book.id === bookId);
  };

  const getReadingListItem = (bookId: string): ReadingListItem | undefined => {
    return readingList.find((item) => item.book.id === bookId);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-logo">
              <div>
                <h1>
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  BookFinder
                </h1>
                <p className="header-subtitle">Discover your next great read</p>
              </div>
            </div>

            <div className="header-nav">
              <nav>
                <button
                  onClick={() => setCurrentView('search')}
                  className={`nav-button ${currentView === 'search' ? 'active' : ''}`}
                >
                  Search
                </button>
                <button
                  onClick={() => setCurrentView('reading-list')}
                  className={`nav-button ${currentView === 'reading-list' ? 'active' : ''}`}
                >
                  My List
                  {readingList.length > 0 && (
                    <span className={`badge ${currentView === 'reading-list' ? 'active-badge' : 'inactive-badge'}`}>
                      {readingList.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'search' && (
          <>
            <div className="section-card">
              <div className="section-content">
                <h2 className="section-title">Search for Books</h2>
                <SearchBar
                  value={query}
                  onChange={handleQueryChange}
                  onSubmit={handleSearchSubmit}
                  isSearching={isSearching}
                />

                {error && (
                  <div className="error-message">
                    <div className="error-content">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {hasSearched && !isSearching && books.length > 0 && availableGenres.length > 0 && (
              <div className="section-card">
                <GenreFilter
                  genres={availableGenres}
                  selectedGenre={selectedGenre}
                  onSelectGenre={handleGenreSelect}
                />
              </div>
            )}

            {hasSearched && !isSearching && books.length > 0 && (
              <div className="section-card">
                <div className="results-header">
                  <h2>{selectedGenre ? `${selectedGenre} Books` : 'Search Results'}</h2>
                  <p className="results-count">
                    Showing {filteredBooks.length} of {books.length} books
                  </p>
                </div>
                <BookList
                  books={filteredBooks}
                  onAddToList={addToReadingList}
                  readingList={readingList}
                  onViewDetails={handleViewDetails}
                />
              </div>
            )}

            {!hasSearched && !isSearching && (
              <div className="section-card">
                <div className="empty-state">
                  <div className="empty-icon">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3>Start Your Book Journey</h3>
                  <p>Search for books by title, author, or subject to discover your next favorite read.</p>
                  <div className="suggestion-buttons">
                    <button onClick={() => { setQuery('Harry Potter'); }}>Try "Harry Potter"</button>
                    <button onClick={() => { setQuery('Science Fiction'); }}>Try "Science Fiction"</button>
                    <button onClick={() => { setQuery('Jane Austen'); }}>Try "Jane Austen"</button>
                  </div>
                </div>
              </div>
            )}

            {isSearching && (
              <div className="section-card">
                <div className="loading-state">
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <p>Searching for books...</p>
                </div>
              </div>
            )}
          </>
        )}

        {currentView === 'reading-list' && (
          <>
            <ReadingStats items={readingList} />
            <div className="section-card">
              <h2 className="section-title">My Reading List</h2>
              <ReadingList
                items={readingList}
                onUpdateStatus={updateReadingStatus}
                onUpdatePage={updateCurrentPage}
                onRemove={removeFromReadingList}
                onViewDetails={handleViewDetails}
              />
            </div>
          </>
        )}
      </main>

      {selectedBook && (
        <BookDetail
          book={selectedBook}
          readingListItem={getReadingListItem(selectedBook.id)}
          onClose={handleCloseDetails}
          onAddToList={addToReadingList}
          isInReadingList={isBookInReadingList(selectedBook.id)}
        />
      )}
    </div>
  );
}