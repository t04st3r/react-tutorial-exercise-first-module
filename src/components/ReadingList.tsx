import {useState} from "react";
import type {ReadingListItem} from "../types/book.ts";
import ReadingListItemC from "./ReadingListItem.tsx";

interface ReadingListProps {
    items: ReadingListItem[];
    onUpdateItem: (bookId: string, updates: Partial<ReadingListItem>) => void;
    onRemoveItem: (bookId: string) => void;
}

export default function ReadingList({items, onUpdateItem, onRemoveItem}: ReadingListProps) {
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const filteredItems = statusFilter === 'all'
        ? items
        : items.filter(item => item.status === statusFilter);

    return (
        <div className="reading-list">
            <div className="status-filters">
                <button onClick={() => setStatusFilter('all')}>All</button>
                <button onClick={() => setStatusFilter('to-read')}>To Read</button>
                <button onClick={() => setStatusFilter('reading')}>Reading</button>
                <button onClick={() => setStatusFilter('completed')}>Completed</button>
            </div>

            {/* Reading list items */}
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    <ReadingListItemC
                        key={item.book.id}
                        item={item}
                        onUpdateItem={onUpdateItem}
                        onRemoveItem={onRemoveItem}
                    />
                ))
            ) : (
                <p>No books in this category</p>
            )}
        </div>
    );
}