import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../../utils/helpers';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => scrollToTop()}
      className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-sakura-500 to-sakura-600 text-white rounded-full shadow-sakura-lg hover:scale-110 transition-transform z-30 animate-scale-in"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop;
