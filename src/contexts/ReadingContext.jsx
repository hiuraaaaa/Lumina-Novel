import React, { createContext, useContext, useState, useEffect } from 'react';
import { readingSettings } from '../utils/storage';
import SITE_CONFIG from '../config/settings';

const ReadingContext = createContext();

export const useReading = () => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error('useReading must be used within ReadingProvider');
  }
  return context;
};

export const ReadingProvider = ({ children }) => {
  const [theme, setTheme] = useState(readingSettings.getTheme());
  const [fontSize, setFontSize] = useState(readingSettings.getFontSize());

  useEffect(() => {
    readingSettings.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    readingSettings.setFontSize(fontSize);
  }, [fontSize]);

  const increaseFontSize = () => {
    const sizes = SITE_CONFIG.reading.fontSizes;
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const sizes = SITE_CONFIG.reading.fontSizes;
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  const resetFontSize = () => {
    setFontSize(SITE_CONFIG.reading.defaultFontSize);
  };

  const cycleTheme = () => {
    const themes = Object.keys(SITE_CONFIG.reading.themes);
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const value = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    cycleTheme,
    themes: SITE_CONFIG.reading.themes,
  };

  return (
    <ReadingContext.Provider value={value}>
      {children}
    </ReadingContext.Provider>
  );
};

export default ReadingContext;
