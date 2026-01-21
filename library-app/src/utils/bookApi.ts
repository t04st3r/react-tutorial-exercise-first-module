import type { Book } from '../types/book';
import type { OpenLibraryDoc, OpenLibrarySearchResponse } from '../types/open_library';

const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';
const COVER_IMAGE_BASE_URL = 'https://covers.openlibrary.org/b/id';
const DEFAULT_COVER = '/src/assets/placeholder-book-cover.svg';

/**
 * Generates a cover image URL from Open Library cover ID
 */
export function getCoverImageUrl(coverId: number | undefined): string {
  if (!coverId) return DEFAULT_COVER;
  return `${COVER_IMAGE_BASE_URL}/${coverId}-M.jpg`;
}

/**
 * Extract best available description from Open Library doc
 */
function extractDescription(doc: OpenLibraryDoc): string {
  // Try first sentence
  if (doc.first_sentence && doc.first_sentence.length > 0) {
    return doc.first_sentence[0];
  }

  // Fallback to a generic description based on available data
  const parts: string[] = [];

  if (doc.author_name && doc.author_name.length > 0) {
    parts.push(`A book by ${doc.author_name[0]}`);
  }

  if (doc.subject && doc.subject.length > 0) {
    const subjects = doc.subject.slice(0, 3).join(', ');
    parts.push(`covering topics like ${subjects}`);
  }

  if (doc.first_publish_year) {
    parts.push(`first published in ${doc.first_publish_year}`);
  }

  return parts.length > 0 ? parts.join(', ') + '.' : 'No description available.';
}

/**
 * Extract best available page count from Open Library doc
 */
function extractPageCount(doc: OpenLibraryDoc): number {
  // Try median page count first
  if (doc.number_of_pages_median && doc.number_of_pages_median > 0) {
    return doc.number_of_pages_median;
  }

  // Try the editions page count array
  if (doc.number_of_pages && Array.isArray(doc.number_of_pages) && doc.number_of_pages.length > 0) {
    // Get the most common page count or first one
    return doc.number_of_pages[0];
  }

  // Estimate based on genre if we have it
  if (doc.subject && doc.subject.length > 0) {
    const subject = doc.subject[0].toLowerCase();
    // Rough estimates by genre
    if (subject.includes('novel') || subject.includes('fiction')) {
      return 350;
    } else if (subject.includes('poetry')) {
      return 150;
    } else if (subject.includes('essay') || subject.includes('short')) {
      return 200;
    }
  }

  // Default estimate
  return 250;
}

/**
 * Extract best available genre from Open Library doc
 */
function extractGenre(doc: OpenLibraryDoc): string {
  if (doc.subject && doc.subject.length > 0) {
    // Filter out very generic subjects and pick the most specific one
    const goodSubjects = doc.subject.filter(s => {
      const lower = s.toLowerCase();
      return !lower.includes('accessible book') &&
             !lower.includes('in library') &&
             !lower.includes('protected daisy') &&
             s.length < 50; // Avoid overly long descriptive subjects
    });

    if (goodSubjects.length > 0) {
      return goodSubjects[0];
    }
  }

  // Try to infer from title or other fields
  if (doc.title) {
    const title = doc.title.toLowerCase();
    if (title.includes('history')) return 'History';
    if (title.includes('science')) return 'Science';
    if (title.includes('cook')) return 'Cooking';
    if (title.includes('travel')) return 'Travel';
  }

  return 'General';
}

/**
 * Transforms an Open Library API document to our Book interface
 */
export function transformOpenLibraryDocToBook(doc: OpenLibraryDoc): Book {
  return {
    id: doc.key || `book-${Date.now()}-${Math.random()}`,
    title: doc.title || 'Unknown Title',
    author: doc.author_name?.[0] || 'Unknown Author',
    description: extractDescription(doc),
    coverImage: getCoverImageUrl(doc.cover_i),
    publishedYear: doc.first_publish_year || 0,
    genre: extractGenre(doc),
    pageCount: extractPageCount(doc),
  };
}

/**
 * Searches for books using the Open Library API
 */
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

/**
 * Searches for books by a specific field (title, author, subject, etc.)
 */
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