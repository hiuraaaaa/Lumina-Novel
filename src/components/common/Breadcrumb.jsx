import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <button className="flex items-center gap-1 text-gray-600 hover:text-sakura-600 transition-colors">
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-gray-600 hover:text-sakura-600 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-800 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
