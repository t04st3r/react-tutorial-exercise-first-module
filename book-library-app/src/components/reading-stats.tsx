import type {iBook} from "../types/book.ts";

interface ReadingStatsProps {
    readingList: Array<iBook>;
}


export function ReadingStats ({readingList}: ReadingStatsProps) {

    function statusCounter(readingList: Array<iBook>): Map<string, number> {
        const counter = new Map<string, number>();
        readingList.forEach(book => counter.set(book.readingStatus, (counter.get(book.readingStatus) || 0) + 1));
        return counter
    }

    return (
        <div className="reading-stats-panel">
            <h2>Reading Stats</h2>
            <div className="reading-stats-book-total">
                <p>Total Books: {readingList.length}</p>
            </div>
            <div className="reading-stats-page-total">
                <p>Total Pages: {readingList.reduce((total, book) => total + book.pageCount, 0)}</p>
            </div>
            <div className="reading-stats-count-status">
                {
                    Array.from(statusCounter(readingList)).map(([key, value]) => (
                        <p>{`'${key}' books`}: {value}</p>
                    ))
                }
            </div>
            <div className="reading-stats-page-average-progress">
                <p>Average Progress:
                    {
                        readingList.length > 0 ? (readingList.reduce((sum, book) =>
                            sum + (book.pageCount > 0 ? (book.readingPageNumber / book.pageCount) * 100 : 0), 0) / readingList.length).toFixed(2): 0
                    }
                    %
                </p>
            </div>
        </div>
    );
}
