import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';

const HeroBanner = ({ novels = [], onNovelClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (novels.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % novels.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [novels.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + novels.length) % novels.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % novels.length);
  };

  if (novels.length === 0) return null;

  const currentNovel = novels[currentIndex];

  return (
    <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentNovel.image || '/api/placeholder/1200/500'}
          alt={currentNovel.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-sakura-500 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-current" />
              <span>Featured Novel</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif leading-tight">
              {currentNovel.title}
            </h1>

            {currentNovel.description && (
              <p className="text-white/90 text-lg mb-6 line-clamp-3 leading-relaxed">
                {currentNovel.description}
              </p>
            )}

            <div className="flex items-center gap-4 mb-6">
              {currentNovel.type && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm">
                  {currentNovel.type}
                </span>
              )}
              {currentNovel.status && (
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                  {currentNovel.status}
                </span>
              )}
            </div>

            <button
              onClick={() => onNovelClick(currentNovel)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-sakura-500 to-sakura-600 text-white rounded-full hover:shadow-2xl hover:scale-105 transition-all font-medium"
            >
              <Play className="w-5 h-5" />
              <span>Baca Sekarang</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {novels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
