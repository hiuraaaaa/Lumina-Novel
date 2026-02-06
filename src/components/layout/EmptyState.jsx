import React from 'react';
import { BookOpen } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = BookOpen, 
  title = 'Tidak ada data', 
  description = 'Belum ada konten yang tersedia',
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-sakura-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-sakura-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-gradient-to-r from-sakura-500 to-sakura-600 text-white rounded-full hover:shadow-lg transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
