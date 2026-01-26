import type {Book, ReadingListItem as ReadingListItemType, ReadingStatus} from "../types/book.ts";
import {ReadingListItem} from "./ReadingListItem.tsx";

interface Props {
    items: ReadingListItemType[],
    onUpdateItem: (updatedItem: ReadingListItemType, bookId: string) => void,
    onRemoveItem: (bookId: string) => void,
    setSelectedBook: (bookId: Book) => void,
}
export const ReadingList = ({
    items,
    onUpdateItem,
    onRemoveItem,
    setSelectedBook,
} : Props) => {
    const onStatusChange = (new_status: ReadingStatus, bookId: string) => {
        const item = items.find((item) => item.book.id == bookId);
        if(!item)
            return
        onUpdateItem({...item, status: new_status}, bookId);
    }
    const onUpdatePage = (new_page: number, bookId: string) => {
        const item = items.find((item) => item.book.id == bookId);
        if(!item)
            return
        onUpdateItem({...item, currentPage: new_page}, bookId);
    }
    return (
        <div className="reading-list">
            {items.map((item) => (
                <ReadingListItem item={item}
                                 onStatusChange={onStatusChange}
                                 onRemove={onRemoveItem}
                                 onUpdatePage={onUpdatePage}
                                 setSelectedBook={setSelectedBook}
                />
            ))}
            {items.length <= 0 && "Your readlist is empty"}
        </div>
    )
}