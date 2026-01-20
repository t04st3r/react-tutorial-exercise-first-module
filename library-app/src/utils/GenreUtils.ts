import type { Book } from '../types/book';

/**
 * Extracts unique genres from an array of books
 * Filters out "Unknown" and empty genres
 * Returns sorted array of genre names
 */
export function extractUniqueGenres(books: Book[]): string[] {
  const genreSet = new Set<string>();

  books.forEach((book) => {
    if (book.genre && book.genre !== 'Unknown' && book.genre.trim() !== '') {
      genreSet.add(book.genre);
    }
  });

  return Array.from(genreSet).sort();
}

/**
 * Filters books by genre
 * Returns all books if genre is null
 */
export function filterBooksByGenre(books: Book[], genre: string | null): Book[] {
  if (!genre) {
    return books;
  }

  return books.filter((book) => book.genre === genre);
}

/**
 * Gets count of books per genre
 * Useful for displaying counts in filter UI
 */
export function getGenreCounts(books: Book[]): Record<string, number> {
  const counts: Record<string, number> = {};

  books.forEach((book) => {
    if (book.genre && book.genre !== 'Unknown') {
      counts[book.genre] = (counts[book.genre] || 0) + 1;
    }
  });

  return counts;
}