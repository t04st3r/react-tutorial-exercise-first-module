import type { Book } from '../types/book';
import type { OpenLibraryDoc, OpenLibrarySearchResponse } from '../types/open_library';

const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';
const COVER_IMAGE_BASE_URL = 'https://covers.openlibrary.org/b/id';
const DEFAULT_COVER = '/src/assets/placeholder-book-cover.svg';

export function getCoverImageUrl(coverId: number | undefined): string {
  if (!coverId) return DEFAULT_COVER;
  return `${COVER_IMAGE_BASE_URL}/${coverId}-M.jpg`;
}

function extractDescription(doc: OpenLibraryDoc): string {
  if (doc.first_sentence && doc.first_sentence.length > 0) {
    return doc.first_sentence[0];
  }

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

function extractPageCount(doc: OpenLibraryDoc): number {
  if (doc.number_of_pages_median && doc.number_of_pages_median > 0) {
    return doc.number_of_pages_median;
  }

  if (doc.number_of_pages && Array.isArray(doc.number_of_pages) && doc.number_of_pages.length > 0) {
    return doc.number_of_pages[0];
  }

  if (doc.subject && doc.subject.length > 0) {
    const subject = doc.subject[0].toLowerCase();
    if (subject.includes('novel') || subject.includes('fiction')) {
      return 350;
    } else if (subject.includes('poetry')) {
      return 150;
    } else if (subject.includes('essay') || subject.includes('short')) {
      return 200;
    }
  }

  return 250;
}

function extractGenre(doc: OpenLibraryDoc): string {
  if (doc.subject && doc.subject.length > 0) {
    const goodSubjects = doc.subject.filter(s => {
      const lower = s.toLowerCase();
      return !lower.includes('accessible book') &&
          !lower.includes('in library') &&
          !lower.includes('protected daisy') &&
          s.length < 50;
    });

    if (goodSubjects.length > 0) {
      return goodSubjects[0];
    }
  }

  if (doc.title) {
    const title = doc.title.toLowerCase();

    const rules = [
      {keywords: ['science fiction', 'sci-fi'], genre: 'Science Fiction'},
      {keywords: ['self-help', 'self help'], genre: 'Self-Help'},
      {keywords: ['how to'], genre: 'How-To'},
      {keywords: ['young adult'], genre: 'Young Adult'},
      {keywords: ['history'], genre: 'History'},
      {keywords: ['philosophy'], genre: 'Philosophy'},
      {keywords: ['psychology'], genre: 'Psychology'},
      {keywords: ['economics'], genre: 'Economics'},
      {keywords: ['politics'], genre: 'Politics'},
      {keywords: ['sociology'], genre: 'Sociology'},
      {keywords: ['biography'], genre: 'Biography'},
      {keywords: ['memoir'], genre: 'Memoir'},
      {keywords: ['essays', 'essay'], genre: 'Essays'},
      {keywords: ['guide'], genre: 'Guide'},
      {keywords: ['handbook'], genre: 'Handbook'},
      {keywords: ['manual'], genre: 'Manual'},
      {keywords: ['programming', 'coding'], genre: 'Programming'},
      {keywords: ['software'], genre: 'Software'},
      {keywords: ['computer'], genre: 'Computers'},
      {keywords: ['startup'], genre: 'Entrepreneurship'},
      {keywords: ['business'], genre: 'Business'},
      {keywords: ['management'], genre: 'Management'},
      {keywords: ['marketing'], genre: 'Marketing'},
      {keywords: ['productivity'], genre: 'Productivity'},
      {keywords: ['photography'], genre: 'Photography'},
      {keywords: ['design'], genre: 'Design'},
      {keywords: ['music'], genre: 'Music'},
      {keywords: ['fashion'], genre: 'Fashion'},
      {keywords: ['craft'], genre: 'Crafts'},
      {keywords: ['art'], genre: 'Art'},
      {keywords: ['nutrition'], genre: 'Nutrition'},
      {keywords: ['diet'], genre: 'Diet'},
      {keywords: ['fitness'], genre: 'Fitness'},
      {keywords: ['health'], genre: 'Health'},
      {keywords: ['gardening'], genre: 'Gardening'},
      {keywords: ['nature'], genre: 'Nature'},
      {keywords: ['cook', 'cooking'], genre: 'Cooking'},
      {keywords: ['travel'], genre: 'Travel'},
      {keywords: ['science'], genre: 'Science'},
    ];

    for (const {keywords, genre} of rules) {
      if (keywords.some(k => title.includes(k))) {
        return genre;
      }
    }
  }
  return 'General';
}


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

 // * Searches for books by a specific field (title, author, subject, etc.)  - Not yet available in UI
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