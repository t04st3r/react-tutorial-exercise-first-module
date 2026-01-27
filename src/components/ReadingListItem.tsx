import type {Book, ReadingListItem} from "../types/book.ts";
import BookCard from "./BookCard";

type ReadingListItemProps = {
    book: Book;
};

export default function ReadingListItem({ book }: ReadingListItemProps) {
    return (
        <div className='reading-list'>
            <BookCard
                key={book.id}
                book={book}
                isInReadingList={true}
                onAddToList={() => {/* handle add */
                }}
            />
        </div>
    );
}