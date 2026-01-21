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

    getCoverImageUrl(): string;
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

    constructor(id: string, title: string, author: string, description: string, coverImage: string, publishedYear: number, language: string, pageCount: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.coverImage = coverImage;
        this.publishedYear = publishedYear;
        this.language = language;
        this.pageCount = pageCount;
    }

    getCoverImageUrl(): string {
        return `${bookLibraryImageApi}/b/id/${this.coverImage}-M.jpg`;
    }
    
}
