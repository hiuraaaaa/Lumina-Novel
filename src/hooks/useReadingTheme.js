import { useState, useEffect } from 'react';
import { readingSettings } from '../utils/storage';
import SITE_CONFIG from '../config/settings';

export const useReadingTheme = () => {
  const [theme, setThemeState] = useState(readingSettings.getTheme());

  const setTheme = (newTheme) => {
    const themes = Object.keys(SITE_CONFIG.reading.themes);
    if (themes.includes(newTheme)) {
      setThemeState(newTheme);
      readingSettings.setTheme(newTheme);
    }
  };

  const cycleTheme = () => {
    const themes = Object.keys(SITE_CONFIG.reading.themes);
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeStyles = () => {
    return SITE_CONFIG.reading.themes[theme] || SITE_CONFIG.reading.themes.light;
  };

  return {
    theme,
    setTheme,
    cycleTheme,
    themeStyles: getThemeStyles(),
    availableThemes: SITE_CONFIG.reading.themes,
  };
};

export default useReadingTheme;
