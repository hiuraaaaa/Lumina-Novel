import React from 'react';
import { Eye, Star, Clock, BookOpen } from 'lucide-react';
import { truncateText, getStatusColor } from '../../utils/helpers';

const NovelCard = ({ novel, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-sakura-lg transition-all duration-400 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img 
          src={novel.image || '/api/placeholder/300/450'} 
          alt={novel.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
          loading="lazy"
        />
        
        {/* Status Badge */}
        {novel.status && (
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 ${getStatusColor(novel.status)} text-white text-xs font-medium rounded-full shadow-lg`}>
              {novel.status}
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        
        {/* Stats on Hover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          {novel.views && (
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{novel.views}</span>
            </div>
          )}
          {novel.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{novel.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-sakura-600 transition-colors leading-tight">
          {novel.title}
        </h3>
        
        {novel.type && (
          <p className="text-xs text-gray-500 mb-2">
            {novel.type}
          </p>
        )}

        {novel.latestChapter && (
          <div className="flex items-center gap-2 text-xs text-gray-600 bg-sakura-50 rounded-lg px-3 py-2">
            <BookOpen className="w-4 h-4 text-sakura-500" />
            <span className="line-clamp-1">{truncateText(novel.latestChapter, 30)}</span>
          </div>
        )}

        {novel.updatedAt && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
            <Clock className="w-3 h-3" />
            <span>{novel.updatedAt}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NovelCard;
