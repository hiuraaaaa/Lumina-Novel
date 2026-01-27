import { useState, useEffect } from 'react';
import { bookmarkStorage } from '../utils/storage';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setBookmarks(bookmarkStorage.getAll());
  }, []);

  const addBookmark = (novelSlug, chapterSlug, novelTitle, chapterTitle) => {
    bookmarkStorage.add(novelSlug, chapterSlug, novelTitle, chapterTitle);
    setBookmarks(bookmarkStorage.getAll());
  };

  const removeBookmark = (novelSlug, chapterSlug) => {
    bookmarkStorage.remove(novelSlug, chapterSlug);
    setBookmarks(bookmarkStorage.getAll());
  };

  const isBookmarked = (novelSlug, chapterSlug) => {
    return bookmarkStorage.exists(novelSlug, chapterSlug);
  };

  const toggleBookmark = (novelSlug, chapterSlug, novelTitle, chapterTitle) => {
    if (isBookmarked(novelSlug, chapterSlug)) {
      removeBookmark(novelSlug, chapterSlug);
      return false;
    } else {
      addBookmark(novelSlug, chapterSlug, novelTitle, chapterTitle);
      return true;
    }
  };

  const clearBookmarks = () => {
    bookmarkStorage.clear();
    setBookmarks([]);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    clearBookmarks,
  };
};

export default useBookmarks;
