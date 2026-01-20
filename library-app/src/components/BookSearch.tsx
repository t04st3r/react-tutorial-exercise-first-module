import { useState, useMemo } from 'react';
import type { FormEvent } from 'react';
import { searchBooks } from '../utils/bookApi';
import { SearchBar } from './SearchBar';
import { BookList } from './BookList';
import { GenreFilter } from './GenreFilter';
import type { Book } from '../types/book';
import type { ReadingListItem } from '../types/reading_list_item';

export function BookSearch() {
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

  const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsSearching(true);
    setError(null);
    setHasSearched(true);
    setSelectedGenre(null); // Reset genre filter on new search

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
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  };

  const handleAddToList = (book: Book) => {
    // Create a new reading list item
    const newItem: ReadingListItem = {
      book,
      status: 'to-read',
      currentPage: 0,
      dateAdded: new Date().toISOString(),
    };

    setReadingList((prev) => [...prev, newItem]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Book Search
        </h1>
        <p className="text-gray-600">
          Search for books and add them to your reading list
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          onSubmit={handleSearchSubmit}
          isSearching={isSearching}
        />

        {/* Error Message */}
        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Reading List Summary */}
      {readingList.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 flex items-center gap-2">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            {readingList.length} book{readingList.length !== 1 ? 's' : ''} in your reading list
          </p>
        </div>
      )}

      {/* Genre Filter */}
      {hasSearched && !isSearching && books.length > 0 && availableGenres.length > 0 && (
        <div className="mb-6">
          <GenreFilter
            genres={availableGenres}
            selectedGenre={selectedGenre}
            onSelectGenre={handleGenreSelect}
          />
        </div>
      )}

      {/* Book List or Empty State */}
      {hasSearched && !isSearching && (
        <BookList
          books={filteredBooks}
          onAddToList={handleAddToList}
          readingList={readingList}
        />
      )}

      {/* Initial Empty State (before any search) */}
      {!hasSearched && !isSearching && (
        <div className="text-center py-16">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Start searching for books
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Enter a title, author, or subject to find your next great read.
          </p>
        </div>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="text-center py-16">
          <svg
            className="animate-spin mx-auto h-12 w-12 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="mt-4 text-sm text-gray-600">Searching for books...</p>
        </div>
      )}
    </div>
  );
}