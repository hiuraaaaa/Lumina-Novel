import React from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { useReading } from '../../contexts/ReadingContext';

const FontSizeControl = () => {
  const { fontSize, increaseFontSize, decreaseFontSize, resetFontSize, canIncrease, canDecrease } = useReading();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decreaseFontSize}
        disabled={!canDecrease}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Perkecil Font"
      >
        <Minus className="w-4 h-4" />
      </button>

      <button
        onClick={resetFontSize}
        className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors min-w-[60px]"
        title="Reset Font Size"
      >
        <span className="text-sm font-medium">{fontSize}px</span>
      </button>

      <button
        onClick={increaseFontSize}
        disabled={!canIncrease}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Perbesar Font"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FontSizeControl;
