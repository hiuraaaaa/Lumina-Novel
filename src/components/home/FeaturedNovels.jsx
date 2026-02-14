import React from 'react';
import { TrendingUp, Clock, Star } from 'lucide-react';
import { truncateText } from '../../utils/helpers';

const FeaturedNovelCard = ({ novel, rank, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-card hover:shadow-sakura-lg transition-all group w-full text-left"
    >
      {/* Rank */}
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sakura-500 to-sakura-600 rounded-xl flex items-center justify-center">
        <span className="text-white font-bold text-xl">{rank}</span>
      </div>

      {/* Image */}
      <div className="flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden">
        <img
          src={novel.image || '/api/placeholder/100/150'}
          alt={novel.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-800 group-hover:text-sakura-600 transition-colors line-clamp-2 mb-1">
          {novel.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          {novel.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{novel.rating}</span>
            </div>
          )}
          {novel.views && (
            <span>{novel.views} views</span>
          )}
        </div>
      </div>
    </button>
  );
};

const FeaturedNovels = ({ novels = [], onNovelClick }) => {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-br from-sakura-50 to-white rounded-3xl p-6 md:p-8 shadow-lg border border-sakura-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-sakura-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-gray-800">
              Trending Novels
            </h2>
            <p className="text-sm text-gray-600">Paling populer minggu ini</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {novels.slice(0, 10).map((novel, index) => (
            <FeaturedNovelCard
              key={novel.slug || index}
              novel={novel}
              rank={index + 1}
              onClick={() => onNovelClick(novel)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNovels;
