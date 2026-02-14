import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GenreBadge from '../common/GenreBadge';

const GenreCarousel = ({ genres = [], onGenreClick }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-serif text-gray-800">
          Jelajahi Genre
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-sakura-100 hover:bg-sakura-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-sakura-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-sakura-100 hover:bg-sakura-200 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-sakura-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {genres.map((genre, index) => (
          <div key={index} className="flex-shrink-0">
            <GenreBadge
              genre={genre.name || genre}
              onClick={() => onGenreClick(genre)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenreCarousel;
