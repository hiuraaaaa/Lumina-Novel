import React, { useEffect, useState } from 'react';
import ChapterContent from '../components/reader/ChapterContent';
import ChapterNavigation from '../components/reader/ChapterNavigation';
import ReadingControls from '../components/reader/ReadingControls';
import BookmarkButton from '../components/reader/BookmarkButton';
import ProgressBar from '../components/reader/ProgressBar';
import ChapterListSidebar from '../components/reader/ChapterListSidebar';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';
import apiService from '../services/api';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { historyStorage, lastReadStorage } from '../utils/storage';
import { getNextChapter, getPreviousChapter } from '../utils/readingUtils';

const ReadPage = ({ novel, chapterSlug, onBack, onChapterChange }) => {
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChapterList, setShowChapterList] = useState(false);

  const { progress } = useReadingProgress(novel?.slug, chapterSlug);

  useEffect(() => {
    loadChapter();
  }, [chapterSlug]);

  useEffect(() => {
    if (chapter && novel) {
      // Save to history
      historyStorage.add(
        novel.slug,
        chapter.slug,
        novel.title,
        chapter.title,
        novel.image
      );

      // Save last read
      lastReadStorage.set(novel.slug, chapter.slug);
    }
  }, [chapter, novel]);

  const loadChapter = async () => {
    try {
      setLoading(true);
      const data = await apiService.getChapter(chapterSlug);
      setChapter(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (!novel?.chapters) return;
    const prev = getPreviousChapter(novel.chapters, chapterSlug);
    if (prev) {
      onChapterChange(prev);
    }
  };

  const handleNext = () => {
    if (!novel?.chapters) return;
    const next = getNextChapter(novel.chapters, chapterSlug);
    if (next) {
      onChapterChange(next);
    }
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    'arrowleft': handlePrevious,
    'arrowright': handleNext,
    'escape': onBack,
  });

  if (loading) {
    return <LoadingSpinner text="Memuat chapter..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadChapter} />;
  }

  if (!chapter) {
    return <ErrorMessage message="Chapter tidak ditemukan" />;
  }

  const currentChapterData = novel?.chapters?.find(ch => ch.slug === chapterSlug);
  const prevChapter = novel?.chapters ? getPreviousChapter(novel.chapters, chapterSlug) : null;
  const nextChapter = novel?.chapters ? getNextChapter(novel.chapters, chapterSlug) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ChapterContent
          chapter={chapter}
          novelTitle={novel?.title}
        />
      </div>

      {/* Navigation */}
      <ChapterNavigation
        currentChapter={currentChapterData}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onShowList={() => setShowChapterList(true)}
      />

      {/* Reading Controls */}
      <ReadingControls />

      {/* Bookmark Button */}
      <BookmarkButton
        novelSlug={novel?.slug}
        chapterSlug={chapterSlug}
        novelTitle={novel?.title}
        chapterTitle={chapter?.title}
      />

      {/* Chapter List Sidebar */}
      <ChapterListSidebar
        isOpen={showChapterList}
        onClose={() => setShowChapterList(false)}
        chapters={novel?.chapters || []}
        currentChapter={currentChapterData}
        onChapterClick={onChapterChange}
      />
    </div>
  );
};

export default ReadPage;
