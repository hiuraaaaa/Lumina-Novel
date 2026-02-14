import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import NovelHeader from '../components/detail/NovelHeader';
import SynopsisCard from '../components/detail/SynopsisCard';
import NovelInfo from '../components/detail/NovelInfo';
import ChapterList from '../components/detail/ChapterList';
import RelatedNovels from '../components/detail/RelatedNovels';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';
import apiService from '../services/api';
import { progressStorage, lastReadStorage } from '../utils/storage';
import { scrollToTop } from '../utils/helpers';

const DetailPage = ({ novelSlug, onBack, onChapterClick, onNovelClick }) => {
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readProgress, setReadProgress] = useState({});

  useEffect(() => {
    loadNovelDetail();
    scrollToTop(false);
  }, [novelSlug]);

  const loadNovelDetail = async () => {
    try {
      setLoading(true);
      const data = await apiService.getNovelDetail(novelSlug);
      setNovel(data);

      // Load read progress
      if (data.chapters) {
        const progress = {};
        data.chapters.forEach(chapter => {
          progress[chapter.slug] = progressStorage.get(novelSlug, chapter.slug);
        });
        setReadProgress(progress);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReadFirst = () => {
    if (novel?.chapters && novel.chapters.length > 0) {
      const lastRead = lastReadStorage.get(novelSlug);
      const chapter = lastRead
        ? novel.chapters.find(ch => ch.slug === lastRead.chapterSlug)
        : novel.chapters[0];
      
      onChapterClick(novel, chapter || novel.chapters[0]);
    }
  };

  const handleBookmark = () => {
    // Bookmark functionality handled by context
    console.log('Toggle bookmark for novel:', novelSlug);
  };

  if (loading) {
    return <LoadingSpinner text="Memuat detail novel..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadNovelDetail} />;
  }

  if (!novel) {
    return <ErrorMessage message="Novel tidak ditemukan" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sakura-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-sakura-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali</span>
        </button>

        {/* Novel Header */}
        <NovelHeader
          novel={novel}
          onReadFirst={handleReadFirst}
          onBookmark={handleBookmark}
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Synopsis */}
            {novel.synopsis && (
              <SynopsisCard synopsis={novel.synopsis} />
            )}

            {/* Chapter List */}
            {novel.chapters && (
              <ChapterList
                chapters={novel.chapters}
                onChapterClick={(chapter) => onChapterClick(novel, chapter)}
                readProgress={readProgress}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <NovelInfo
              novel={novel}
              onGenreClick={(genre) => console.log('Genre clicked:', genre)}
              onTagClick={(tag) => console.log('Tag clicked:', tag)}
            />
          </div>
        </div>

        {/* Related Novels */}
        {novel.related && (
          <RelatedNovels
            novels={novel.related}
            onNovelClick={onNovelClick}
          />
        )}
      </div>
    </div>
  );
};

export default DetailPage;
