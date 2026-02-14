import React from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import { useBookmark } from '../contexts/BookmarkContext';
import EmptyState from '../components/layout/EmptyState';
import { formatDate } from '../utils/helpers';

const BookmarksPage = ({ onChapterClick, onNovelClick }) => {
  const { bookmarks, removeBookmark, clearAllBookmarks } = useBookmark();

  if (bookmarks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sakura-50 to-white">
        <div className="container mx-auto px-4 py-6">
          <EmptyState
            icon={Bookmark}
            title="Belum Ada Bookmark"
            description="Bookmark chapter favoritmu agar mudah diakses kembali"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sakura-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sakura-500 rounded-2xl flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-gray-800">
                Bookmark Saya
              </h1>
              <p className="text-gray-600">
                {bookmarks.length} chapter tersimpan
              </p>
            </div>
          </div>

          {bookmarks.length > 0 && (
            <button
              onClick={clearAllBookmarks}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Hapus Semua</span>
            </button>
          )}
        </div>

        {/* Bookmarks List */}
        <div className="space-y-4">
          {bookmarks.map((bookmark, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 50}ms` }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-sakura-lg transition-all animate-slide-up"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <button
                    onClick={() => onNovelClick({ slug: bookmark.novelSlug })}
                    className="text-sm text-gray-600 hover:text-sakura-600 mb-2 block"
                  >
                    {bookmark.novelTitle}
                  </button>
                  <button
                    onClick={() => onChapterClick(
                      { slug: bookmark.novelSlug },
                      { slug: bookmark.chapterSlug }
                    )}
                    className="text-lg font-semibold text-gray-800 hover:text-sakura-600 transition-colors line-clamp-2"
                  >
                    {bookmark.chapterTitle}
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    {formatDate(bookmark.timestamp)}
                  </p>
                </div>

                <button
                  onClick={() => removeBookmark(bookmark.novelSlug, bookmark.chapterSlug)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
