import React from 'react';
import { ArrowLeft, ArrowRight, List } from 'lucide-react';

const ChapterNavigation = ({ 
  currentChapter, 
  prevChapter, 
  nextChapter, 
  onPrevious, 
  onNext,
  onShowList 
}) => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-sakura-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={!prevChapter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-sakura-100 text-sakura-600 hover:bg-sakura-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden md:inline">Previous</span>
          </button>

          {/* Current Chapter */}
          <button
            onClick={onShowList}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all max-w-md"
          >
            <List className="w-5 h-5" />
            <span className="font-medium truncate">{currentChapter?.title}</span>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={!nextChapter}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-sakura-100 text-sakura-600 hover:bg-sakura-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span className="hidden md:inline">Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterNavigation;
