const bookLibraryImageApi = import.meta.env.VITE_BOOK_LIBRARY_IMAGE_API_URL;


export interface iBook {
    id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    publishedYear: number;
    language: string;
    pageCount: number;
    readingStatus: 'To Read' | 'Reading' | 'Completed'  // TODO: move to an enum
    readingPageNumber: number;

    getCoverImageUrl(): string;
    setReadingStatus(newStatus: 'To Read' | 'Reading' | 'Completed'): void;
    readingPageNumberIncrease(): void;
    readingPageNumberDecrease(): void;
}


export class Book implements iBook {
    id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    publishedYear: number;
    language: string;
    pageCount: number;
    readingStatus: 'To Read' | 'Reading' | 'Completed';
    readingPageNumber: number;

    constructor(id: string, title: string, author: string, description: string, coverImage: string, publishedYear: number, language: string, pageCount: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.coverImage = coverImage;
        this.publishedYear = publishedYear;
        this.language = language;
        this.pageCount = pageCount;
        this.readingStatus = 'To Read';
        this.readingPageNumber = 0;
    }

    getCoverImageUrl(): string {
        return `${bookLibraryImageApi}/b/id/${this.coverImage}-M.jpg`;
    }

    setReadingStatus(newStatus: 'To Read' | 'Reading' | 'Completed'): void {
        this.readingStatus = newStatus;
    }

    readingPageNumberIncrease(): void {
        this.readingPageNumber++;
    }

    readingPageNumberDecrease(): void {
        this.readingPageNumber--;
    }

}
