import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SynopsisCard = ({ synopsis }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;
  const shouldTruncate = synopsis && synopsis.length > maxLength;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
      <h2 className="text-xl font-bold font-serif text-gray-800 mb-4">
        Sinopsis
      </h2>
      
      <div className="text-gray-700 leading-relaxed">
        {shouldTruncate && !isExpanded ? (
          <>
            <p>{synopsis.substring(0, maxLength)}...</p>
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-1 text-sakura-600 hover:text-sakura-700 font-medium mt-3 transition-colors"
            >
              <span>Baca Selengkapnya</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <p className="whitespace-pre-line">{synopsis}</p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-1 text-sakura-600 hover:text-sakura-700 font-medium mt-3 transition-colors"
              >
                <span>Sembunyikan</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SynopsisCard;
