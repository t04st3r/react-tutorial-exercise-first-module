import type {ReadingListItem} from "../types/book.ts";

type ReadingListItemProps = {
  ReadingLists: ReadingListItem[];
  selectedReadingList: string;
  onSelectReadingList: () => void;
};

export default function ReadingListItem({ReadingLists, selectedReadingList, onSelectReadingList}: ReadingListItemProps) {

    return (
        <div className='reading-list'>

        </div>
  )
}