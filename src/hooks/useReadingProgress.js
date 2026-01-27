import { useState, useEffect, useCallback } from 'react';
import { progressStorage } from '../utils/storage';
import { calculateScrollPercentage } from '../utils/readingUtils';
import { throttle } from '../utils/helpers';

export const useReadingProgress = (novelSlug, chapterSlug) => {
  const [progress, setProgress] = useState(0);

  // Load initial progress
  useEffect(() => {
    const savedProgress = progressStorage.get(novelSlug, chapterSlug);
    setProgress(savedProgress);
  }, [novelSlug, chapterSlug]);

  // Handle scroll
  const handleScroll = useCallback(
    throttle(() => {
      const scrollPercentage = calculateScrollPercentage();
      setProgress(scrollPercentage);
      progressStorage.set(novelSlug, chapterSlug, scrollPercentage);
    }, 1000),
    [novelSlug, chapterSlug]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const resetProgress = () => {
    setProgress(0);
    progressStorage.set(novelSlug, chapterSlug, 0);
  };

  const setManualProgress = (value) => {
    setProgress(value);
    progressStorage.set(novelSlug, chapterSlug, value);
  };

  return {
    progress,
    resetProgress,
    setProgress: setManualProgress,
  };
};

export default useReadingProgress;
