# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

⏱️ **Estimated completion time:** ~10 hours

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

## 📋 Requirements

### Part 1: Project Setup ⚙️

1. Create a new React project using Vite with the TypeScript template
2. Set up SCSS for styling
3. Create a clean folder structure:
   ```
   src/
   ├── components/
   ├── types/
   ├── utils/
   └── assets/
   ```

### Part 2: Data & Types 📝

1. Create a TypeScript interface for a `Book` in `src/types/book.ts`:
   ```typescript
   interface Book {
     id: string;
     title: string;
     author: string;
     description: string;
     coverImage: string;
     publishedYear: number;
     language: string;
     pageCount: number;
   }
   ```

2. Create an interface for a `ReadingListItem`:
   ```typescript
   interface ReadingListItem {
     book: Book;
     status: 'to-read' | 'reading' | 'completed';
     currentPage: number;
     dateAdded: string;
   }
   ```

3. Fetch books from the **Open Library API**:
   - Search endpoint: `https://openlibrary.org/search.json?q={query}&limit=20`
   - Cover images: `https://covers.openlibrary.org/b/id/{cover_id}-M.jpg`

   **Helper:** Create a utility function to transform API response to your `Book` interface.

   **Mapping rules:**
   - `author`: Pick the first element from `author_name` array, or `"Unknown"` if not available
   - `language`: Pick the first element from `language` array, or `"Unknown"` if not available
   - `description`: Set to a hardcoded string like `"Some description here"` (not available in search results)

### Part 3: Core Components 🧩

Build the following components with proper TypeScript props interfaces:

#### 3.1 `BookCard` Component
- Display book cover, title, author, and year
- Accept props: `book`, `onAddToList`, `isInReadingList`
- Conditionally render an "Add to List" or "Already Added" button
- Use proper event handling for the button click

#### 3.2 `BookList` Component
- Render a grid/list of `BookCard` components
- Accept props: `books`, `onAddToList`, `readingList`
- Use `.map()` with proper `key` props
- Handle empty state (no books found)

#### 3.3 `SearchBar` Component
- Input field for search queries
- Accept props: `value`, `onChange`, `onSubmit`
- Handle form submission with `preventDefault()`
- Implement controlled input pattern

#### 3.4 `LanguageFilter` Component
- Display filter buttons/chips for languages
- Accept props: `languages`, `selectedLanguage`, `onSelectLanguage`
- Highlight the currently selected language
- Include an "All" option to clear the filter

### Part 4: Reading List Feature 📖

#### 4.1 `ReadingListItem` Component
- Display book info with reading status
- Show progress bar based on `currentPage / pageCount`
- Include buttons to:
  - Update status (to-read → reading → completed)
  - Update current page (increment/decrement)
  - Remove from list
- Use `stopPropagation()` appropriately if needed

#### 4.2 `ReadingList` Component
- Render all items in the reading list
- Accept props: `items`, `onUpdateItem`, `onRemoveItem`
- Filter items by status (show tabs: All, To Read, Reading, Completed)
- Handle empty states for each filter

#### 4.3 State Management
In your main `App` component:
- Manage `readingList` state as an array of `ReadingListItem`
- Implement functions using **immutable patterns**:
  - `addToReadingList(book)` - add new item with spread operator
  - `removeFromReadingList(bookId)` - use `.filter()`
  - `updateReadingStatus(bookId, newStatus)` - use `.map()`
  - `updateCurrentPage(bookId, page)` - use `.map()` with object spread

### Part 5: Advanced Features 🚀

#### 5.1 Statistics Component
Create a `ReadingStats` component that displays:
- Total books in reading list
- Books by status (count for each)
- Total pages read across all books
- Average progress percentage

This component should be **pure** - derive all values from props, don't use internal state.

#### 5.2 Lifting State Up
Implement a feature where clicking a book in `BookList` OR `ReadingList` shows a `BookDetail` modal/panel. The "selected book" state should be lifted to `App` and passed down to both components.

### Part 6: Styling 🎨

- Style your application using SCSS
- Use SCSS features: variables, nesting, and/or mixins
- Make the UI responsive (mobile-friendly)
- Add visual feedback for interactive elements (hover states, active states)

---

## 🌐 API Reference

### Open Library Search API

**Endpoint:** `https://openlibrary.org/search.json`

**Query Parameters:**
- `q` - Search query (required)
- `limit` - Number of results (optional, default 100)

**Example Request:**
```
https://openlibrary.org/search.json?q=javascript&limit=20
```

**Example Response:**
```json
{
  "numFound": 1234,
  "docs": [
    {
      "key": "/works/OL123W",
      "title": "JavaScript: The Good Parts",
      "author_name": ["Douglas Crockford"],
      "first_publish_year": 2008,
      "cover_i": 8091016,
      "number_of_pages_median": 176,
      "language": ["eng", "spa"]
    }
  ]
}
```
