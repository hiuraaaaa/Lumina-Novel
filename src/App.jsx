import React, { useState } from 'react';
import { ReadingProvider } from './contexts/ReadingContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Preloader from './components/layout/Preloader';
import ScrollToTop from './components/common/ScrollToTop';
import SakuraPetals from './components/layout/SakuraPetals';
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
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Novel click handler
  const handleNovelClick = (novel) => {
    handleNavigate('detail', { novelSlug: novel.slug || novel });
  };

  // Chapter click handler
  const handleChapterClick = (novel, chapter) => {
    handleNavigate('read', {
      novel,
      chapterSlug: chapter.slug || chapter
    });
  };

  // Search handler
  const handleSearch = (query) => {
    handleNavigate('search', { query });
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onNovelClick={handleNovelClick}
          />
        );

      case 'detail':
        return (
          <DetailPage
            novelSlug={pageData.novelSlug}
            onBack={() => handleNavigate('home')}
            onChapterClick={handleChapterClick}
            onNovelClick={handleNovelClick}
          />
        );

      case 'read':
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
          {/* Decorative Petals */}
          <SakuraPetals count={5} />

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
