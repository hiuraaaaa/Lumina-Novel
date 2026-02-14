import React, { useState } from 'react';
import { List, Grid, ChevronDown, ChevronUp, Search } from 'lucide-react';
import ChapterCard from '../common/ChapterCard';

const ChapterList = ({ chapters = [], onChapterClick, readProgress = {} }) => {
  const [viewMode, setViewMode] = useState('list');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredChapters = chapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedChapters = [...filteredChapters].sort((a, b) => {
    const aNum = parseInt(a.title.match(/\d+/)?.[0] || 0);
    const bNum = parseInt(b.title.match(/\d+/)?.[0] || 0);
    return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
  });

  const displayedChapters = showAll ? sortedChapters : sortedChapters.slice(0, 20);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-serif text-gray-800">
          Daftar Chapter ({chapters.length})
        </h2>

        <div className="flex items-center gap-2">
          {/* Sort Button */}
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="p-2 rounded-lg hover:bg-sakura-100 transition-colors"
            title={sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
          >
            {sortOrder === 'asc' ? (
              <ChevronUp className="w-5 h-5 text-gray-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-700" />
            )}
          </button>

          {/* View Mode Toggle */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari chapter..."
          className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sakura-400"
        />
      </div>

      {/* Chapters */}
      <div className={`space-y-3 ${viewMode === 'grid' ? 'grid md:grid-cols-2 gap-3' : ''}`}>
        {displayedChapters.map((chapter, index) => (
          <div
            key={chapter.slug || index}
            style={{ animationDelay: `${index * 30}ms` }}
            className="animate-slide-up"
          >
            <ChapterCard
              chapter={chapter}
              onClick={() => onChapterClick(chapter)}
              isRead={readProgress[chapter.slug] > 50}
            />
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {chapters.length > 20 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 bg-sakura-100 text-sakura-600 rounded-full hover:bg-sakura-200 transition-colors font-medium"
          >
            {showAll ? 'Tampilkan Lebih Sedikit' : `Tampilkan Semua (${chapters.length - 20} lagi)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChapterList;
