import React from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmark } from '../../contexts/BookmarkContext';

const BookmarkButton = ({ novelSlug, chapterSlug, novelTitle, chapterTitle }) => {
  const { isBookmarked, toggleBookmark } = useBookmark();
  const bookmarked = isBookmarked(novelSlug, chapterSlug);

  const handleClick = () => {
    const added = toggleBookmark(novelSlug, chapterSlug, novelTitle, chapterTitle);
    
    // Show toast notification (optional)
    if (added) {
      console.log('Bookmark ditambahkan!');
    } else {
      console.log('Bookmark dihapus!');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-36 left-6 p-4 rounded-full shadow-sakura-lg hover:scale-110 transition-all z-30 ${
        bookmarked
          ? 'bg-gradient-to-r from-sakura-500 to-sakura-600 text-white'
          : 'bg-white text-gray-700 border-2 border-gray-300'
      }`}
      title={bookmarked ? 'Hapus Bookmark' : 'Tambah Bookmark'}
    >
      <Bookmark className={`w-6 h-6 ${bookmarked ? 'fill-current' : ''}`} />
    </button>
  );
};

export default BookmarkButton;
