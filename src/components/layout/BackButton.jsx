import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ onClick, label = 'Kembali' }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-sakura-600 transition-colors group mb-6"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default BackButton;
