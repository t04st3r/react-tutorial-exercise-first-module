import type { Book } from "../types/book";
import { get } from "./request";

export const ALL_LANGUAGES = 'all';

interface OpenLibraryResponse {
  numFound: number;
  docs: OpenLibraryDoc[];
}

interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year: number;
  cover_i: number;
  number_of_pages_median?: number;
  language?: string[];
  subject: string[];
}

export const lookUpBook = async (query: string, limit: number = 20): Promise<Book[]> => {
  const url = `https://openlibrary.org/search.json?q=${query}&limit=${limit}`;
  const response = await get<OpenLibraryResponse>(url);

  // since `get()` may return `undefined`, ensure we actually got a response
  // before taking the `docs`. If we don't, we have no books to show.
  const bookData = response?.docs ?? [];

  const books = bookData.map<Book>(doc => {
    const mainAuthor = doc.author_name?.at(0) || 'Anonymous';
    const language = doc.language?.at(0) || '???';
    const description = `"${doc.title}" by ${doc.author_name} (${doc.first_publish_year})`;
    return {
      id: doc.key,
      title: doc.title,
      author: mainAuthor,
      description: description,
      coverImage: `${doc.cover_i}`,
      publishedYear: `${doc.first_publish_year}`,
      pageCount: `${doc.number_of_pages_median || 'unknown'}`,
      language: language,
    }
  });

  return books;
}

type CoverImageSize = 'S' | 'M' | 'L'

export const getCoverImageUrl = (coverId: string | number, size: CoverImageSize = 'M'): string => {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
