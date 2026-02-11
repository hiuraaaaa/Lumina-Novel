import React from 'react';
import { Tag } from 'lucide-react';

const TagBadge = ({ tag, onClick, size = 'md' }) => {
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} inline-flex items-center gap-1.5 bg-sakura-100 text-sakura-700 rounded-full hover:bg-sakura-200 transition-colors font-medium`}
    >
      <Tag className="w-3 h-3" />
      <span>{tag}</span>
    </button>
  );
};

export default TagBadge;
