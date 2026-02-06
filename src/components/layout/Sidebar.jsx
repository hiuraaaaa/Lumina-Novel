import React from 'react';
import { X, List } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white z-50 shadow-2xl animate-slide-right overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sakura-200 bg-gradient-to-r from-sakura-50 to-white">
          <div className="flex items-center gap-2">
            <List className="w-5 h-5 text-sakura-600" />
            <h3 className="font-semibold text-gray-800">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sakura-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
