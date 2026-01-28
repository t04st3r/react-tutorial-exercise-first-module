import type {ReadingListItem} from "../types/book.ts";

type ReadingListItemProps = {
    item: ReadingListItem;
    onUpdateItem: (bookId: string, updates: Partial<ReadingListItem>) => void;
    onRemoveItem: (bookId: string) => void;
};

export default function ReadingListItemC({item, onUpdateItem, onRemoveItem}: ReadingListItemProps) {
    const {book, status, currentPage} = item;
    const progress = book.number_of_pages_median > 0 ? (currentPage / book.number_of_pages_median) * 100 : 0;

    const handleStatusChange = () => {
        const statusFlow = {
            'to-read': 'reading',
            'reading': 'completed',
            'completed': 'to-read'
        } as const;
        const newStatus = statusFlow[status];
        onUpdateItem(book.id, {status: newStatus});
    };

    const handlePageIncrement = () => {
        if (currentPage < book.number_of_pages_median) {
            onUpdateItem(book.id, {currentPage: currentPage + 1});
        }
    };
    const handlePageDecrement = () => {
        if (currentPage > 0) {
            onUpdateItem(book.id, {currentPage: currentPage - 1});
        }
    };

    const handleRemove = () => {
        onRemoveItem(book.id);
    };

    return (
        <div className='reading-list-item'>
            <div className='book-info'>
                <img src={book.coverImage} alt={book.title}/>
                <div>
                    <h3>{book.title}</h3>
                    <p>{book.author_name.join(', ')}</p>
                    <p>{book.publishedYear}</p>
                </div>
            </div>

            <div className='progress-section'>
                <p>Page {currentPage} of {book.number_of_pages_median}</p>
                <div className='progress-bar'>
                    <div
                        className='progress-fill'
                        style={{width: `${progress}%`}}
                    />
                </div>
                <p>{progress.toFixed(0)}% complete</p>
            </div>

            <div className='page-controls'>
                <button
                    onClick={handlePageDecrement}
                    disabled={currentPage === 0}
                >
                    - Page
                </button>
                <button
                    onClick={handlePageIncrement}
                    disabled={currentPage >= book.number_of_pages_median}
                >
                    + Page
                </button>
            </div>

            <div className='status-control'>
                <button onClick={handleStatusChange}>
                    Status: {status}
                </button>
            </div>

            <button
                className='remove-btn'
                onClick={handleRemove}
            >
                Remove from List
            </button>
        </div>
    );
}