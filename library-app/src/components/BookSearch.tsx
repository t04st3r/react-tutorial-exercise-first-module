import { useState, useMemo } from 'react';
import { searchBooks } from '../utils/bookApi';
import { SearchBar } from './SearchBar';
import { BookList } from './BookList';
import { GenreFilter } from './GenreFilter';
import { ReadingList } from './ReadingList';
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

  // Extract unique genres from search results
  const availableGenres = useMemo(() => {
    const genreSet = new Set<string>();
    books.forEach((book) => {
      if (book.genre && book.genre !== 'Unknown') {
        genreSet.add(book.genre);
      }
    });
    return Array.from(genreSet).sort();
  }, [books]);

  // Filter books by selected genre
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

  // Add book to reading list using immutable pattern
  const addToReadingList = (book: Book) => {
    const newItem: ReadingListItem = {
      book,
      status: 'to-read',
      currentPage: 0,
      dateAdded: new Date().toISOString(),
    };

    setReadingList((prev) => [...prev, newItem]);
  };

  // Remove book from reading list using filter
  const removeFromReadingList = (bookId: string) => {
    setReadingList((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  // Update reading status using map
  const updateReadingStatus = (bookId: string, newStatus: 'to-read' | 'reading' | 'completed') => {
    setReadingList((prev) =>
      prev.map((item) =>
        item.book.id === bookId
          ? { ...item, status: newStatus }
          : item
      )
    );
  };

  // Update current page using map with object spread
  const updateCurrentPage = (bookId: string, page: number) => {
    setReadingList((prev) =>
      prev.map((item) =>
        item.book.id === bookId
          ? { ...item, currentPage: page }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                BookFinder
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Discover your next great read
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <nav className="flex gap-2">
                <button
                  onClick={() => setCurrentView('search')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentView === 'search'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Search
                </button>
                <button
                  onClick={() => setCurrentView('reading-list')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    currentView === 'reading-list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  My List
                  {readingList.length > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      currentView === 'reading-list'
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {readingList.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search View */}
        {currentView === 'search' && (
          <>
            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Search for Books
                </h2>
                <SearchBar
                  value={query}
                  onChange={handleQueryChange}
                  onSubmit={handleSearchSubmit}
                  isSearching={isSearching}
                />

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Genre Filter Section */}
            {hasSearched && !isSearching && books.length > 0 && availableGenres.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <GenreFilter
                  genres={availableGenres}
                  selectedGenre={selectedGenre}
                  onSelectGenre={handleGenreSelect}
                />
              </div>
            )}

            {/* Results Section */}
            {hasSearched && !isSearching && books.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedGenre ? `${selectedGenre} Books` : 'Search Results'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Showing {filteredBooks.length} of {books.length} books
                  </p>
                </div>
                <BookList
                  books={filteredBooks}
                  onAddToList={addToReadingList}
                  readingList={readingList}
                />
              </div>
            )}

            {/* Empty State - No Results */}
            {hasSearched && !isSearching && books.length === 0 && !error && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No books found</h3>
                <p className="text-sm text-gray-500">
                  Try searching with different keywords or check your spelling.
                </p>
              </div>
            )}

            {/* Initial Empty State */}
            {!hasSearched && !isSearching && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Start Your Book Journey
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Search for books by title, author, or subject to discover your next favorite read.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => {
                        setQuery('Harry Potter');
                        handleSearchSubmit();
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Try "Harry Potter"
                    </button>
                    <button
                      onClick={() => {
                        setQuery('Science Fiction');
                        handleSearchSubmit();
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Try "Science Fiction"
                    </button>
                    <button
                      onClick={() => {
                        setQuery('Jane Austen');
                        handleSearchSubmit();
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      Try "Jane Austen"
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <svg className="animate-spin mx-auto h-12 w-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-sm text-gray-600 font-medium">Searching for books...</p>
              </div>
            )}
          </>
        )}

        {/* Reading List View */}
        {currentView === 'reading-list' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reading List</h2>
            <ReadingList
              items={readingList}
              onUpdateStatus={updateReadingStatus}
              onUpdatePage={updateCurrentPage}
              onRemove={removeFromReadingList}
            />
          </div>
        )}
      </main>
    </div>
  );
}