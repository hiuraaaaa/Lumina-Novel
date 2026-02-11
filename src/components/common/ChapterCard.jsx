import React from 'react';
import { BookOpen, Clock, Check } from 'lucide-react';

const ChapterCard = ({ chapter, onClick, isRead = false, isBookmarked = false }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-sakura-300 hover:bg-sakura-50 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-sakura-500 flex-shrink-0" />
            <h4 className="font-medium text-gray-800 group-hover:text-sakura-600 line-clamp-1">
              {chapter.title}
            </h4>
          </div>
          
          {chapter.date && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{chapter.date}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          {isRead && (
            <div className="flex items-center gap-1 text-xs text-green-600">
              <Check className="w-4 h-4" />
              <span>Dibaca</span>
            </div>
          )}
          {isBookmarked && (
            <div className="w-2 h-2 bg-sakura-500 rounded-full" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ChapterCard;
