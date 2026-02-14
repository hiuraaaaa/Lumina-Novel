import React, { useState } from 'react';
import { ReadingProvider } from './contexts/ReadingContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Preloader from './components/layout/Preloader';
import ScrollToTop from './components/common/ScrollToTop';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ReadPage from './pages/ReadPage';
import SearchPage from './pages/SearchPage';
import GenresPage from './pages/GenresPage';
import GenrePage from './pages/GenrePage';
import NovelListPage from './pages/NovelListPage';
import BookmarksPage from './pages/BookmarksPage';
import { usePreloader } from './hooks/usePreloader';

function App() {
  const { isLoading: preloaderLoading, progress } = usePreloader();
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState({});

  // Navigation handler
  const handleNavigate = (page, data = {}) => {
    console.log('Navigate to:', page, data);
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Novel click handler
  const handleNovelClick = (novel) => {
    console.log('Novel clicked:', novel);
    const slug = novel.slug || novel;
    handleNavigate('detail', { novelSlug: slug });
  };

  // Chapter click handler
  const handleChapterClick = (novel, chapter) => {
    console.log('Chapter clicked:', novel, chapter);
    handleNavigate('read', {
      novel,
      chapterSlug: chapter.slug || chapter
    });
  };

  // Search handler
  const handleSearch = (query) => {
    console.log('Search:', query);
    handleNavigate('search', { query });
  };

  // Render current page
  const renderPage = () => {
    console.log('Rendering page:', currentPage, pageData);

    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onNovelClick={handleNovelClick}
          />
        );

      case 'detail':
        if (!pageData.novelSlug) {
          console.warn('No novelSlug provided, redirecting to home');
          return <HomePage onNavigate={handleNavigate} onNovelClick={handleNovelClick} />;
        }
        return (
          <DetailPage
            novelSlug={pageData.novelSlug}
            onBack={() => handleNavigate('home')}
            onChapterClick={handleChapterClick}
            onNovelClick={handleNovelClick}
          />
        );

      case 'read':
        if (!pageData.novel || !pageData.chapterSlug) {
          console.warn('Missing novel or chapter data, redirecting to home');
          return <HomePage onNavigate={handleNavigate} onNovelClick={handleNovelClick} />;
        }
        return (
          <ReadPage
            novel={pageData.novel}
            chapterSlug={pageData.chapterSlug}
            onBack={() => handleNavigate('detail', { novelSlug: pageData.novel.slug })}
            onChapterChange={(chapter) =>
              handleChapterClick(pageData.novel, chapter)
            }
          />
        );

      case 'search':
        return (
          <SearchPage
            initialQuery={pageData.query || ''}
            onNovelClick={handleNovelClick}
            onBack={() => handleNavigate('home')}
          />
        );

      case 'genres':
        return (
          <GenresPage
            onGenreClick={(genre) =>
              handleNavigate('genre', { genreSlug: genre.slug || genre })
            }
          />
        );

      case 'genre':
        if (!pageData.genreSlug) {
          return <GenresPage onGenreClick={(genre) => handleNavigate('genre', { genreSlug: genre.slug || genre })} />;
        }
        return (
          <GenrePage
            genreSlug={pageData.genreSlug}
            onBack={() => handleNavigate('genres')}
            onNovelClick={handleNovelClick}
          />
        );

      case 'novels':
        return (
          <NovelListPage
            onNovelClick={handleNovelClick}
          />
        );

      case 'bookmarks':
        return (
          <BookmarksPage
            onChapterClick={handleChapterClick}
            onNovelClick={handleNovelClick}
          />
        );

      default:
        console.warn('Unknown page:', currentPage);
        return (
          <HomePage
            onNavigate={handleNavigate}
            onNovelClick={handleNovelClick}
          />
        );
    }
  };

  // Show preloader
  if (preloaderLoading) {
    return <Preloader progress={progress} />;
  }

  return (
    <ReadingProvider>
      <BookmarkProvider>
        <div className="min-h-screen flex flex-col bg-white">
          {/* Header - Hide on reading page */}
          {currentPage !== 'read' && (
            <Header
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onSearch={handleSearch}
            />
          )}

          {/* Main Content */}
          <main className="flex-1">
            {renderPage()}
          </main>

          {/* Footer - Hide on reading page */}
          {currentPage !== 'read' && <Footer />}

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </div>
      </BookmarkProvider>
    </ReadingProvider>
  );
}

export default App;
