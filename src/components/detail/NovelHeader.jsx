import React from 'react';
import { Star, Eye, Clock, BookOpen, Bookmark } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import RatingStars from '../common/RatingStars';

const NovelHeader = ({ novel, onReadFirst, onBookmark, isBookmarked }) => {
  return (
    <div className="relative bg-gradient-to-br from-sakura-50 to-white rounded-3xl overflow-hidden shadow-xl mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ff69b4" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <div className="relative w-48 md:w-56 mx-auto md:mx-0">
              <img
                src={novel.image || '/api/placeholder/300/450'}
                alt={novel.title}
                className="w-full rounded-2xl shadow-2xl"
              />
              {novel.status && (
                <div className="absolute top-3 right-3">
                  <StatusBadge status={novel.status} />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-3 leading-tight">
              {novel.title}
            </h1>

            {novel.alternativeTitle && (
              <p className="text-gray-600 mb-4">{novel.alternativeTitle}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              {novel.rating && (
                <div className="flex items-center gap-2">
                  <RatingStars rating={novel.rating} />
                </div>
              )}
              
              {novel.views && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{novel.views}</span>
                </div>
              )}

              {novel.chapters && (
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{novel.chapters} Chapter</span>
                </div>
              )}

              {novel.updatedAt && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{novel.updatedAt}</span>
                </div>
              )}
            </div>

            {/* Author & Type */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {novel.author && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Author</p>
                  <p className="font-medium text-gray-800">{novel.author}</p>
                </div>
              )}
              {novel.type && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Type</p>
                  <p className="font-medium text-gray-800">{novel.type}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onReadFirst}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-sakura-500 to-sakura-600 text-white rounded-full hover:shadow-sakura-lg hover:scale-105 transition-all font-medium"
              >
                <BookOpen className="w-5 h-5" />
                <span>Mulai Baca</span>
              </button>

              <button
                onClick={onBookmark}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  isBookmarked
                    ? 'bg-sakura-100 text-sakura-600 border-2 border-sakura-300'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-sakura-300'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelHeader;
