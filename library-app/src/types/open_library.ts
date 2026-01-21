export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  subject?: string[];
  number_of_pages_median?: number;
  number_of_pages?: number[];
  first_sentence?: string[];
  publisher?: string[];
  publish_year?: number[];
  language?: string[];
  edition_count?: number;
}

export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibraryDoc[];
}