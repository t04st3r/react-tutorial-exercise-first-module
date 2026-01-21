import type React from "react";

interface SearchBarProps {
  // XXX: what should we do with these?
  // value: string,
  // onChange: () => void,
  onSubmit: (input: string) => void,
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputValue = formData.get('title') as string;
    onSubmit(inputValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Search by title" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
