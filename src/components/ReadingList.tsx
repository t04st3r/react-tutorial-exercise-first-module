import type {Book, ReadingListItem} from "../types/book.ts";
import BookCard from "./BookCard.tsx";
import {useState} from "react";

interface ReadingListProps {
    items: ReadingListItem[];
    onUpdateItem: () => void;
}

export default function ReadingList({items, onUpdateItem}: ReadingListProps) {

    return (
        <div className="reading-list">
            {items ? items.map((readingListItem) => (
                <BookCard
                    key={readingListItem.book.id}
                    book={readingListItem.book}
                    isInReadingList={items.some(
                        (readingBook) => readingBook.book.id === readingListItem.book.id
                    )}
                    onAddToList={onUpdateItem}
                />
            )) : <p> No books currently on your reading list</p>
            }
        </div>
    )
}
