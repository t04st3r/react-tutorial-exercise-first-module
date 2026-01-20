import type { Book } from '../types/book';
import type { OpenLibraryDoc, OpenLibrarySearchResponse } from '../types/open_library';

const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';
const COVER_IMAGE_BASE_URL = 'https://covers.openlibrary.org/b/id';
const DEFAULT_COVER = '/src/assets/placeholder-book-cover.svg';

// Generate cover image URL
export function getCoverImageUrl(coverId: number | undefined): string {
  if (!coverId) return DEFAULT_COVER;
  return `${COVER_IMAGE_BASE_URL}/${coverId}-M.jpg`;
}

// Transform Open Library API doc Book interface
export function transformOpenLibraryDocToBook(doc: OpenLibraryDoc): Book {
  return {
    id: doc.key || `book-${Date.now()}-${Math.random()}`,
    title: doc.title || 'Unknown Title',
    author: doc.author_name?.[0] || 'Unknown Author',
    description: doc.first_sentence?.[0] || 'No description available.',
    coverImage: getCoverImageUrl(doc.cover_i),
    publishedYear: doc.first_publish_year || 0,
    genre: doc.subject?.[0] || 'Unknown',
    pageCount: doc.number_of_pages_median || 0,
  };
}


// Search for books
export async function searchBooks(query: string, limit: number = 20): Promise<Book[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const url = `${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(query)}&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenLibrarySearchResponse = await response.json();

    return data.docs.map(transformOpenLibraryDocToBook);
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
}


 // Search for books via field - i.e. title, author, subject
export async function searchBooksByField(
  field: 'title' | 'author' | 'subject',
  query: string,
  limit: number = 20
): Promise<Book[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const url = `${OPEN_LIBRARY_SEARCH_URL}?${field}=${encodeURIComponent(query)}&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: OpenLibrarySearchResponse = await response.json();

    return data.docs.map(transformOpenLibraryDocToBook);
  } catch (error) {
    console.error(`Error searching books by ${field}:`, error);
    throw error;
  }
}