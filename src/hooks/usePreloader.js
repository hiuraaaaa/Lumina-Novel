import { useState, useEffect } from 'react';
import SITE_CONFIG from '../config/settings';

export const usePreloader = () => {
  const [isLoading, setIsLoading] = useState(SITE_CONFIG.preloader.enabled);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!SITE_CONFIG.preloader.enabled) {
      setIsLoading(false);
      return;
    }

    const duration = SITE_CONFIG.preloader.duration;
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return { isLoading, progress };
};

export default usePreloader;
