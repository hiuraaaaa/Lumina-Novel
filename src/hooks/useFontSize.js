import { useState, useEffect } from 'react';
import { readingSettings } from '../utils/storage';
import SITE_CONFIG from '../config/settings';

export const useFontSize = () => {
  const [fontSize, setFontSizeState] = useState(readingSettings.getFontSize());

  const setFontSize = (size) => {
    const sizes = SITE_CONFIG.reading.fontSizes;
    if (sizes.includes(size)) {
      setFontSizeState(size);
      readingSettings.setFontSize(size);
    }
  };

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

  const canIncrease = () => {
    const sizes = SITE_CONFIG.reading.fontSizes;
    return sizes.indexOf(fontSize) < sizes.length - 1;
  };

  const canDecrease = () => {
    const sizes = SITE_CONFIG.reading.fontSizes;
    return sizes.indexOf(fontSize) > 0;
  };

  return {
    fontSize,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    canIncrease: canIncrease(),
    canDecrease: canDecrease(),
  };
};

export default useFontSize;
