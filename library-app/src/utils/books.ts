import type { Book } from "../types/books.ts";

const OPEN_LIBRARY = 'https://openlibrary.org';
const COVER_IMAGES = 'https://covers.openlibrary.org';

interface OpenLibraryDoc {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
    language?: string[];
}

interface OpenLibrarySearchResponse {
    docs: OpenLibraryDoc[];
}

function getCoverUrl(coverId?: number): string {
    if (!coverId) return 'https://via.placeholder.com/150x200?text=No+Cover';
    return `${COVER_IMAGES}/b/id/${coverId}-M.jpg`;
}

function transformBook(doc: OpenLibraryDoc): Book {
    return {
        id: doc.key,
        title: doc.title,
        author: doc.author_name?.[0] || 'Unknown',
        description: 'Random description.',
        coverImage: getCoverUrl(doc.cover_i),
        publishedYear: doc.first_publish_year || 0,
        language: doc.language?.[0] || 'Unknown',
        pageCount: 500
    };
}

export async function getBooks(query: string): Promise<Book[]> {
    try {
        const res = await fetch(`${OPEN_LIBRARY}/search.json?q=${query}&limit=20`);
        if (!res.ok) {
            throw new Error(`Failed to fetch books: ${res.statusText}`);
        }
        const data: OpenLibrarySearchResponse = await res.json();
        return data.docs.map(transformBook);
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}