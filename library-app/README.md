# 📚 BookFinder - Reading List Manager

A book search and reading list management application built with React, TypeScript, and SCSS. Search books from the Open Library API, organize them into your personal reading list, and track your reading progress.

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)
![SCSS](https://img.shields.io/badge/SCSS-1.77-cc6699)

## ✨ Features

### 🔍 Book Search
- Search books using the Open Library API
- Real-time search with loading states
- Filter by genre with visual chips
- Sort by title, author, or publication year
- Responsive grid layout for search results

### 📖 Reading List Management
- Add books to your personal reading list
- Three reading statuses: To-Read, Reading, Completed
- Track reading progress with page numbers
- Status-based filtering with tabs
- Progress bars showing completion percentage
- Automatic page updates based on status changes

### 📊 Statistics Dashboard
- Total books in library
- Books count by status
- Total pages read across all books
- Average reading progress percentage
- Visual stat cards with icons

### 🎨 Modern UI/UX
- Clean, professional design
- Light/dark mode support (automatic)
- Smooth animations and transitions
- Responsive design (mobile-first)
- Interactive hover states
- Accessible with ARIA labels

### 🚀 Advanced Features
- Book detail modal with complete information
- Click books anywhere to view details
- Smart genre extraction with 30+ categories
- Intelligent page count estimation
- Empty state designs for better UX
- Error handling with user feedback

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd bookfinder
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── BookCard.tsx           # Individual book display
│   ├── BookList.tsx           # Grid of books
│   ├── SearchBar.tsx          # Search input
│   ├── GenreFilter.tsx        # Genre filter chips
│   ├── SortControl.tsx        # Sorting dropdown
│   ├── ReadingListItem.tsx    # Reading list item with progress
│   ├── ReadingList.tsx        # Reading list with tabs
│   ├── ReadingStats.tsx       # Statistics dashboard
│   ├── BookDetail.tsx         # Book detail modal
│   └── BookSearch.tsx         # Main container
├── types/              # TypeScript interfaces
│   ├── book.ts              # Book interface
│   ├── open_library.ts      # API response types
│   └── reading_list_item.ts # Reading list item type
├── utils/              # Utility functions
│   ├── bookApi.ts          # API calls & data transformation
│   ├── bookSort.ts         # Sorting utilities
│   └── genreUtils.ts       # Genre extraction utilities
├── styles/             # SCSS styles
│   ├── _variables.scss     # Design tokens
│   ├── _mixins.scss        # Reusable mixins
│   ├── main.scss           # Entry point
│   ├── components.scss     # Component imports
│   └── components/         # Component-specific styles
│       ├── _book-card.scss
│       ├── _search-bar.scss
│       ├── _genre-filter.scss
│       ├── _sort-control.scss
│       ├── _reading-list.scss
│       ├── _reading-list-item.scss
│       ├── _reading-stats.scss
│       └── _book-detail.scss
└── assets/             # Static assets
    └── placeholder-book-cover.svg
```

## 🏗️ Implementation Decisions

### Architecture

**Component-Based Design**
- Followed single responsibility principle
- Each component has a clear, focused purpose
- Highly reusable and composable components
- Props interfaces for type safety

**State Management**
- Used React's `useState` for local state
- Lifted state to parent components where needed
- Immutable update patterns (spread, filter, map)
- No external state management library needed

### TypeScript

**Type Safety**
- Strict TypeScript configuration
- Comprehensive interfaces for all data structures
- No `any` types used
- Generic types for utility functions
- Type-safe event handlers

**API Response Transformation**
- Created separate types for API responses
- Transformer functions convert API data to app types
- Fallbacks for missing data
- Genre inference from multiple sources

### Styling

**SCSS Architecture**
- Variables for design tokens (colors, spacing, etc.)
- Mixins for reusable patterns (buttons, cards, inputs)
- Component-specific style files
- Modular and maintainable structure

**Light/Dark Mode**
- Uses CSS `light-dark()` function
- Automatic adaptation to user preference
- All colors support both themes
- Smooth transitions between modes

**Responsive Design**
- Mobile-first approach
- Five breakpoints (xs, sm, md, lg, xl)
- Flexible grid layouts
- Touch-friendly interactions

### API Integration

**Open Library API**
- Search endpoint for book queries
- Cover image CDN for book covers
- Field-specific searches available
- Error handling with user feedback

**Data Enhancement**
- Smart genre extraction (30+ categories)
- Page count estimation when unavailable
- Description generation from available data
- Fallback placeholder images

### User Experience

**Status-Based Logic**
- To-Read: No progress tracking
- Reading: Full page controls available
- Completed: Auto-sets pages to total, read-only progress

**Progressive Enhancement**
- Works without JavaScript for basic functionality
- Graceful degradation for older browsers
- Optimistic UI updates
- Loading states for all async operations

**Accessibility**
- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators on interactive elements

### Performance

**Optimization Techniques**
- `useMemo` for expensive computations
- Lazy loading for images
- Debounced search (if needed)
- Efficient re-renders with proper keys

**Build Optimization**
- Vite's fast HMR in development
- Optimized production builds
- Code splitting ready
- Tree-shakeable SCSS

## 🎯 Key Features Explained

### Genre Filtering
Books are automatically categorized using:
1. API-provided subject tags (filtered for quality)
2. Title keyword analysis (30+ genre rules)
3. Fallback to "General" category

### Sorting
Sort books by:
- **Title**: Alphabetical (case-insensitive)
- **Author**: Alphabetical (case-insensitive)
- **Year**: Chronological
- Toggle ascending/descending order

### Reading Progress
- Progress bar based on `currentPage / pageCount`
- Manual page input or increment/decrement buttons
- Status changes automatically update pages
- Completed books show completion message

### Statistics
Pure component that calculates:
- Total books across all statuses
- Count per status (to-read, reading, completed)
- Total pages read (sum of all currentPage values)
- Average progress across all books

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Reference

### Open Library API

**Search Books**
```
GET https://openlibrary.org/search.json?q={query}&limit=20
```

**Book Covers**
```
GET https://covers.openlibrary.org/b/id/{cover_id}-M.jpg
```

**Field-Specific Search** (Function created but not currently available in UI - Future Improvement)
```
GET https://openlibrary.org/search.json?title={title}&limit=20
GET https://openlibrary.org/search.json?author={author}&limit=20
GET https://openlibrary.org/search.json?subject={subject}&limit=20
```

## 🐛 Known Limitations

- Open Library API may have incomplete data for some books
- Cover images depend on API availability
- No offline functionality
- Reading list stored in component state (not persisted)

## 🔮 Future Enhancements

- [ ] LocalStorage persistence for reading list
- [ ] Book recommendations
- [ ] Export reading list (CSV/PDF)
- [ ] Advanced search field filters
- [ ] Reading time estimates
