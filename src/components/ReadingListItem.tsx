import {
    type Book,
    type ReadingListItem as ReadingListItemType,
    type ReadingStatus,
    statusLabel
} from "../types/book.ts";

interface Props {
    item: ReadingListItemType;
    onStatusChange: (status: ReadingStatus, bookId: string) => void;
    onUpdatePage: (page: number, bookId: string) => void;
    onRemove: (bookId: string) => void;
    setSelectedBook: (bookId: Book) => void;
}

export const ReadingListItem = ({item, onStatusChange, onUpdatePage, onRemove, setSelectedBook}: Props) => {
    return (
        <div className="readlist-item">
            <h1>{item.book.title}</h1>
            <div className="statuses">
                {Object.entries(statusLabel).map(([status, label]) => (
                    <button className={`status-button ${item.status == status ? 'selected' : ''}`}
                         onClick={(e) => {
                             e.stopPropagation();
                             onStatusChange(status as ReadingStatus, item.book.id)
                         }}>
                        {label}
                    </button>
                ))}
            </div>
                <div className="page-buttons">
                    <button className="reading-item-page-button"
                            disabled={item.currentPage <= 1}
                    onClick={(e) => {
                        e.stopPropagation();
                        onUpdatePage(item.currentPage - 1, item.book.id)}
                    }
                    >
                        ←
                    </button>
                    <p>Page: {item.currentPage} / {item.book.pageCount}</p>
                    <button className="reading-item-page-button"
                            disabled={item.currentPage >= item.book.pageCount }
                            onClick={(e) => {
                                e.stopPropagation();
                                onUpdatePage(item.currentPage + 1, item.book.id)}
                            }
                    >
                        ➜
                    </button>
                </div>
                <button onClick={(e) =>
                {
                    e.stopPropagation();
                    onRemove(item.book.id)
                }}>
                    Remove from readlist
                </button>
                <button onClick={() => setSelectedBook({...item.book})}>More info</button>
        </div>
    )
}