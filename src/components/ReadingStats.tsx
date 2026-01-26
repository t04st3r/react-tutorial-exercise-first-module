import {type ReadingListItem, statusLabel} from "../types/book.ts";

interface props {
    readList: ReadingListItem[]
}
export const ReadingStats = ({readList}: props) => {
    const totalReadPages = readList.reduce(
        (readPages, listItem) => readPages + listItem.currentPage, 0)
    const totalPages = readList.reduce(
        (readPages, listItem) => readPages + listItem.book.pageCount, 0)
    return (
        <div className="reading-stats">
            <p>Total books in Readlist: {readList.length}</p>
            {Object.entries(statusLabel).map(([status, label]) => (
                <p key={status}>
                    Books in state '{label}':
                    {readList.filter((readItem) => readItem.status === status).length}
                </p>
            ))}
            <p>
                Total read pages: {totalReadPages}
            </p>
            {totalPages > 0 &&
                <p>
                    Average progress percentage: {totalReadPages / totalPages}
                </p>
            }
        </div>
    )
}