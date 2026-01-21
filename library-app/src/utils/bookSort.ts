import type { Book } from '../types/book';

export type SortField = 'title' | 'author' | 'year';
export type SortOrder = 'asc' | 'desc';

export function sortBooks(books: Book[], field: SortField, order: SortOrder = 'asc'): Book[] {
  const sortedBooks = [...books];

  sortedBooks.sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'title':
        comparison = a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
        break;
      case 'author':
        comparison = a.author.localeCompare(b.author, undefined, { sensitivity: 'base' });
        break;
      case 'year':
        comparison = a.publishedYear - b.publishedYear;
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sortedBooks;
}