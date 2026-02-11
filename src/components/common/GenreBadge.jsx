import React from 'react';
import { randomColor } from '../../utils/helpers';

const GenreBadge = ({ genre, onClick, selected = false }) => {
  const [color] = React.useState(randomColor());

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        selected
          ? 'bg-gradient-to-r from-sakura-500 to-sakura-600 text-white shadow-sakura'
          : `${color} text-white hover:shadow-lg hover:scale-105`
      }`}
    >
      {genre}
    </button>
  );
};

export default GenreBadge;
