import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizes[size]} relative animate-spin`}>
        <div className="absolute inset-0 rounded-full border-4 border-sakura-200" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sakura-600" />
      </div>
      {text && (
        <p className="mt-4 text-gray-600 text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
