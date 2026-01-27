import React, { createContext, useContext, useState, useEffect } from 'react';
import { bookmarkStorage } from '../utils/storage';

const BookmarkContext = createContext();

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark must be used within BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(bookmarkStorage.getAll());

  const addBookmark = (novelSlug, chapterSlug, novelTitle, chapterTitle) => {
    const newBookmark = bookmarkStorage.add(novelSlug, chapterSlug, novelTitle, chapterTitle);
    setBookmarks(bookmarkStorage.getAll());
    return newBookmark;
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

  const clearAllBookmarks = () => {
    bookmarkStorage.clear();
    setBookmarks([]);
  };

  const value = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    clearAllBookmarks,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext;
