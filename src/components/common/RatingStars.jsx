import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, maxRating = 5, size = 'md', showNumber = true }) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const stars = Array.from({ length: maxRating }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = i === Math.floor(rating) && rating % 1 !== 0;

    return (
      <Star
        key={i}
        className={`${sizes[size]} ${
          filled
            ? 'fill-yellow-400 text-yellow-400'
            : partial
            ? 'fill-yellow-200 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    );
  });

  return (
    <div className="flex items-center gap-1">
      {stars}
      {showNumber && (
        <span className="text-sm text-gray-600 ml-1 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
