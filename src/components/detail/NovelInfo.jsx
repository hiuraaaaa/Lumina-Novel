import React from 'react';
import TagBadge from '../common/TagBadge';

const NovelInfo = ({ novel, onGenreClick, onTagClick }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
      <h2 className="text-xl font-bold font-serif text-gray-800 mb-4">
        Informasi Novel
      </h2>

      <div className="space-y-4">
        {/* Genres */}
        {novel.genres && novel.genres.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Genre</p>
            <div className="flex flex-wrap gap-2">
              {novel.genres.map((genre, index) => (
                <button
                  key={index}
                  onClick={() => onGenreClick && onGenreClick(genre)}
                  className="px-3 py-1.5 bg-sakura-100 text-sakura-700 rounded-full text-sm font-medium hover:bg-sakura-200 transition-colors"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {novel.tags && novel.tags.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {novel.tags.map((tag, index) => (
                <TagBadge
                  key={index}
                  tag={tag}
                  onClick={() => onTagClick && onTagClick(tag)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          {novel.releaseYear && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Tahun Rilis</p>
              <p className="font-medium text-gray-800">{novel.releaseYear}</p>
            </div>
          )}
          
          {novel.language && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Bahasa</p>
              <p className="font-medium text-gray-800">{novel.language}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NovelInfo;
