# React Fundamentals Assessment - Module 1

## Exercise: Build a Book Library Application

### Overview

In this assessment, you will build a **Book Library Application** using React, TypeScript, and Vite. The application will allow users to browse books, search/filter them, manage a reading list, and track their reading progress.

**Estimated completion time:** ~6 hours

---

## Learning Objectives

This exercise will test your understanding of:

- Project setup with Vite, React, and TypeScript
- Component composition and architecture
- Props and TypeScript interfaces
- State management with `useState`
- Event handling and propagation
- Conditional rendering
- List rendering with keys
- Immutable state updates (objects and arrays)
- Lifting state up
- Component purity

---

## Requirements

### Part 1: Project Setup (30 min)

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

### Part 2: Data & Types (30 min)

1. Create a TypeScript interface for a `Book` in `src/types/book.ts`:
   ```typescript
   interface Book {
     id: string;
     title: string;
     author: string;
     description: string;
     coverImage: string;
     publishedYear: number;
     genre: string;
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

### Part 3: Core Components (2 hours)

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

#### 3.4 `GenreFilter` Component
- Display filter buttons/chips for genres
- Accept props: `genres`, `selectedGenre`, `onSelectGenre`
- Highlight the currently selected genre
- Include an "All" option to clear the filter

### Part 4: Reading List Feature (1.5 hours)

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

### Part 5: Advanced Features (1 hour)

#### 5.1 Statistics Component
Create a `ReadingStats` component that displays:
- Total books in reading list
- Books by status (count for each)
- Total pages read across all books
- Average progress percentage

This component should be **pure** - derive all values from props, don't use internal state.

#### 5.2 Lifting State Up
Implement a feature where clicking a book in `BookList` OR `ReadingList` shows a `BookDetail` modal/panel. The "selected book" state should be lifted to `App` and passed down to both components.

### Part 6: Styling (30 min)

- Style your application using SCSS
- Use SCSS features: variables, nesting, and/or mixins
- Make the UI responsive (mobile-friendly)
- Add visual feedback for interactive elements (hover states, active states)

---

## API Reference

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
      "subject": ["JavaScript", "Programming"]
    }
  ]
}
```

**Cover Image URL Pattern:**
```
https://covers.openlibrary.org/b/id/{cover_i}-M.jpg
```
Replace `{cover_i}` with the `cover_i` value from the API response. Use `-S` for small, `-M` for medium, or `-L` for large images.

---

## Evaluation Criteria

Your submission will be evaluated on:

| Criteria | Weight | Description |
|----------|--------|-------------|
| **Project Setup** | 10% | Correct Vite + TypeScript + SCSS configuration |
| **TypeScript Usage** | 15% | Proper interfaces, type annotations, generic types |
| **Component Architecture** | 20% | Clean separation, reusability, proper prop definitions |
| **State Management** | 20% | Correct useState usage, immutable updates, lifting state |
| **Event Handling** | 15% | Proper handlers, propagation control, form handling |
| **Conditional & List Rendering** | 10% | Correct patterns, proper keys, edge cases handled |
| **Code Quality & Styling** | 10% | Clean code, SCSS usage, responsive design |

---

## Submission Requirements

1. Push your code to a Git repository
2. Include a `README.md` in your project with:
   - Setup instructions
   - Brief description of your implementation decisions
3. Ensure `npm install && npm run dev` works without errors
4. Ensure `npm run build` completes without TypeScript errors

---

## Hints & Tips

- Start by setting up the project and creating all type definitions
- Build components bottom-up (start with smaller, simpler ones)
- Test each component in isolation before integrating
- Use React DevTools to debug state and props
- Remember: state updates are asynchronous and batched
- When updating arrays/objects in state, always create new references
- Use the browser console to debug API responses before transforming them

---

## Bonus Challenges (Optional)

If you finish early, consider adding:

- **Local Storage Persistence:** Save reading list to localStorage and restore on page load
- **Loading States:** Add loading spinners while fetching from API
- **Error Handling:** Display user-friendly error messages when API calls fail
- **Sorting:** Allow sorting books by title, author, or year

---

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Open Library API](https://openlibrary.org/developers/api)
- [SCSS Documentation](https://sass-lang.com/documentation/)

---

Good luck! Remember to commit your progress regularly and don't hesitate to refer back to the tutorial materials if needed.
