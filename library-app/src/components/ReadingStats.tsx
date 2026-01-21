import type { ReadingListItem } from '../types/reading_list_item';

interface ReadingStatsProps {
  items: ReadingListItem[];
}

export function ReadingStats({ items }: ReadingStatsProps) {
  const totalBooks = items.length;

  const booksByStatus = {
    'to-read': items.filter(item => item.status === 'to-read').length,
    'reading': items.filter(item => item.status === 'reading').length,
    'completed': items.filter(item => item.status === 'completed').length,
  };

  const totalPagesRead = items.reduce((sum, item) => sum + item.currentPage, 0);

  const averageProgress = totalBooks > 0
    ? items.reduce((sum, item) => {
        const bookProgress = item.book.pageCount > 0
          ? (item.currentPage / item.book.pageCount) * 100
          : 0;
        return sum + bookProgress;
      }, 0) / totalBooks
    : 0;

  const stats = [
    {
      label: 'Total Books',
      value: totalBooks,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      colorClass: 'stat-icon-blue',
    },
    {
      label: 'To Read',
      value: booksByStatus['to-read'],
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      colorClass: 'stat-icon-gray',
    },
    {
      label: 'Reading',
      value: booksByStatus['reading'],
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      colorClass: 'stat-icon-blue',
    },
    {
      label: 'Completed',
      value: booksByStatus['completed'],
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      colorClass: 'stat-icon-green',
    },
  ];

  return (
    <div className="reading-stats">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className={`stat-icon ${stat.colorClass}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="additional-stats">
        <div className="large-stat-card">
          <div className="stat-header">
            <div className="stat-icon stat-icon-purple">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3>Pages Read</h3>
          </div>
          <p className="stat-value">{totalPagesRead.toLocaleString()}</p>
          <p className="stat-description">Total pages across all books</p>
        </div>

        <div className="large-stat-card">
          <div className="stat-header">
            <div className="stat-icon stat-icon-orange">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3>Average Progress</h3>
          </div>
          <p className="stat-value">{averageProgress.toFixed(1)}%</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(averageProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}