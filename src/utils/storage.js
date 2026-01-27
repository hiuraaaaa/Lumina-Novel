const STORAGE_KEYS = {
  BOOKMARKS: 'sakura_bookmarks',
  READING_PROGRESS: 'sakura_reading_progress',
  READING_HISTORY: 'sakura_reading_history',
  THEME: 'sakura_reading_theme',
  FONT_SIZE: 'sakura_font_size',
  LAST_READ: 'sakura_last_read',
};

// Generic storage helpers
export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
};

// Bookmarks
export const bookmarkStorage = {
  getAll() {
    return storage.get(STORAGE_KEYS.BOOKMARKS, []);
  },

  add(novelSlug, chapterSlug, novelTitle, chapterTitle) {
    const bookmarks = this.getAll();
    const newBookmark = {
      novelSlug,
      chapterSlug,
      novelTitle,
      chapterTitle,
      timestamp: Date.now()
    };
    
    // Remove existing bookmark for same chapter
    const filtered = bookmarks.filter(
      b => !(b.novelSlug === novelSlug && b.chapterSlug === chapterSlug)
    );
    
    filtered.unshift(newBookmark);
    storage.set(STORAGE_KEYS.BOOKMARKS, filtered);
    return newBookmark;
  },

  remove(novelSlug, chapterSlug) {
    const bookmarks = this.getAll();
    const filtered = bookmarks.filter(
      b => !(b.novelSlug === novelSlug && b.chapterSlug === chapterSlug)
    );
    storage.set(STORAGE_KEYS.BOOKMARKS, filtered);
  },

  exists(novelSlug, chapterSlug) {
    const bookmarks = this.getAll();
    return bookmarks.some(
      b => b.novelSlug === novelSlug && b.chapterSlug === chapterSlug
    );
  },

  clear() {
    storage.set(STORAGE_KEYS.BOOKMARKS, []);
  }
};

// Reading Progress
export const progressStorage = {
  get(novelSlug, chapterSlug) {
    const allProgress = storage.get(STORAGE_KEYS.READING_PROGRESS, {});
    const key = `${novelSlug}:${chapterSlug}`;
    return allProgress[key] || 0;
  },

  set(novelSlug, chapterSlug, progress) {
    const allProgress = storage.get(STORAGE_KEYS.READING_PROGRESS, {});
    const key = `${novelSlug}:${chapterSlug}`;
    allProgress[key] = progress;
    storage.set(STORAGE_KEYS.READING_PROGRESS, allProgress);
  },

  getNovelProgress(novelSlug) {
    const allProgress = storage.get(STORAGE_KEYS.READING_PROGRESS, {});
    const novelProgress = {};
    
    Object.keys(allProgress).forEach(key => {
      if (key.startsWith(novelSlug + ':')) {
        novelProgress[key] = allProgress[key];
      }
    });
    
    return novelProgress;
  }
};

// Reading History
export const historyStorage = {
  getAll() {
    return storage.get(STORAGE_KEYS.READING_HISTORY, []);
  },

  add(novelSlug, chapterSlug, novelTitle, chapterTitle, novelImage) {
    const history = this.getAll();
    const newEntry = {
      novelSlug,
      chapterSlug,
      novelTitle,
      chapterTitle,
      novelImage,
      timestamp: Date.now()
    };
    
    // Remove existing entry for same chapter
    const filtered = history.filter(
      h => !(h.novelSlug === novelSlug && h.chapterSlug === chapterSlug)
    );
    
    // Add to beginning
    filtered.unshift(newEntry);
    
    // Keep only last 50
    const limited = filtered.slice(0, 50);
    storage.set(STORAGE_KEYS.READING_HISTORY, limited);
  },

  clear() {
    storage.set(STORAGE_KEYS.READING_HISTORY, []);
  }
};

// Reading Settings
export const readingSettings = {
  getTheme() {
    return storage.get(STORAGE_KEYS.THEME, 'light');
  },

  setTheme(theme) {
    storage.set(STORAGE_KEYS.THEME, theme);
  },

  getFontSize() {
    return storage.get(STORAGE_KEYS.FONT_SIZE, 18);
  },

  setFontSize(size) {
    storage.set(STORAGE_KEYS.FONT_SIZE, size);
  }
};

// Last Read
export const lastReadStorage = {
  get(novelSlug) {
    const allLastRead = storage.get(STORAGE_KEYS.LAST_READ, {});
    return allLastRead[novelSlug] || null;
  },

  set(novelSlug, chapterSlug) {
    const allLastRead = storage.get(STORAGE_KEYS.LAST_READ, {});
    allLastRead[novelSlug] = {
      chapterSlug,
      timestamp: Date.now()
    };
    storage.set(STORAGE_KEYS.LAST_READ, allLastRead);
  }
};

export default storage;
