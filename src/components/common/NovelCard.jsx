import React, { useState } from 'react';
import { Star, BookOpen } from 'lucide-react';

const NovelCard = ({ novel, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const imageUrl = novel.poster || novel.image;

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[2/3] bg-gradient-to-br from-pink-100 to-pink-200">
        {/* Loading State */}
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-8 h-8 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Image */}
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl}
            alt={novel.title}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-400 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              console.error('Image load error:', imageUrl);
              setImageError(true);
              setImageLoading(false);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="text-center">
              <BookOpen className="w-12 h-12 mx-auto text-pink-400 mb-2" />
              <p className="text-xs text-gray-600 font-medium line-clamp-3">{novel.title}</p>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        {novel.status && novel.status !== 'Unknown' && (
          <div className="absolute top-2 right-2 z-10">
            <span className={`px-2 py-1 text-white text-xs font-medium rounded-full shadow-lg ${
              novel.status === 'Ongoing' ? 'bg-green-500' : 
              novel.status === 'Completed' ? 'bg-blue-500' : 'bg-gray-500'
            }`}>
              {novel.status}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        
        {/* Info on Hover */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
          {novel.rating && novel.rating !== '0' && (
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{novel.rating}</span>
            </div>
          )}
          {novel.type && (
            <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs">
              {novel.type}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors text-sm leading-tight min-h-[2.5rem]">
          {novel.title}
        </h3>
        
        {novel.latest_chapter && (
          <div className="flex items-start gap-1 text-xs text-gray-600 bg-pink-50 rounded-lg px-2 py-1.5 mt-2">
            <BookOpen className="w-3 h-3 text-pink-500 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2 text-xs">{novel.latest_chapter}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NovelCard;
