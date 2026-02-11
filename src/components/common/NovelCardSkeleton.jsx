import React from 'react';

const NovelCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[2/3] bg-gray-200" />
      
      {/* Content Skeleton */}
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-8 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
};

export default NovelCardSkeleton;
