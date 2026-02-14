import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import ChapterCard from '../common/ChapterCard';
import { Search } from 'lucide-react';

const ChapterListSidebar = ({ 
  isOpen, 
  onClose, 
  chapters = [], 
  currentChapter,
  onChapterClick 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChapters = chapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Sidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Daftar Chapter"
    >
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari chapter..."
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sakura-400"
          />
        </div>
      </div>

      {/* Chapters */}
      <div className="p-4 space-y-3">
        {filteredChapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.slug || index}
            chapter={chapter}
            onClick={() => {
              onChapterClick(chapter);
              onClose();
            }}
            isRead={chapter.slug === currentChapter?.slug}
          />
        ))}
      </div>
    </Sidebar>
  );
};

export default ChapterListSidebar;
