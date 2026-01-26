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
            <table>
                <thead>
                <tr>
                    <th>
                        Your stats
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Total books in Readlist</td>
                    <td>{readList.length}</td>
                </tr>
                {Object.entries(statusLabel).map(([status, label]) => (
                    <tr key={status}>
                        <td>Books in state '{label}'</td>
                        <td>
                            {readList.filter((readItem) => readItem.status === status).length}
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>Total read pages</td>
                    <td>{totalReadPages}</td>
                </tr>
                <tr>
                    <td>Average progress percentage:</td>
                    <td>
                        {totalPages > 0 ? totalReadPages / totalPages : 0}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}