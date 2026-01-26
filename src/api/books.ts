import type { Book } from '../types/book.ts'

const SEARCH_LIMIT = 20;

export async function fetchBooks(query: string): Promise<Book[]> {
    const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
            query
        )}&limit=${SEARCH_LIMIT}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }

    const data = await response.json();

    return data.docs.map((doc: any): Book => ({
        id: doc.key,
        title: doc.title ?? 'Unknown title',
        author: doc.author_name?.[0] ?? 'Unknown',
        description: 'Some description here',
        coverImage: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
            : '',
        publishedYear: doc.first_publish_year ?? 0,
        language: doc.language?.[0] ?? 'unknown',
        pageCount: doc.number_of_pages_median ?? 0,
    }));
}