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
        <div className="reading-list-item">
            <h1 onClick={() => setSelectedBook({...item.book})}>{item.book.title}</h1>
            <div className="reading-list-item-statuses">
                {Object.entries(statusLabel).map(([status, label]) => (
                    <div className={`reading-list-item-status ${item.status == status ? 'selected-status' : ''}`}
                         onClick={(e) => {
                             e.stopPropagation();
                             onStatusChange(status as ReadingStatus, item.book.id)
                         }}>
                        {label}
                    </div>
                ))}
            </div>
            <div>
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
                <button onClick={(e) =>
                {
                    e.stopPropagation();
                    onRemove(item.book.id)
                }}>
                    Remove from readlist</button>
            </div>
        </div>
    )
}