interface Props {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}
export const SearchBar = ({value, onChange, onSubmit}: Props) => {
    return (
        <div className="searchbar">
            <input
                value={value}
                onChange={(e) => {onChange(e.target.value)}}
                type="search"
                placeholder="Search" />
            <button onClick={(e) => {
                e.preventDefault();
                onSubmit()}
            }>
                Submit
            </button>
        </div>
    )
}