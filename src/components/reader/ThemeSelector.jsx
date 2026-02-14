import React from 'react';
import { useReading } from '../../contexts/ReadingContext';

const ThemeSelector = () => {
  const { theme, themes, setTheme } = useReading();

  return (
    <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
      {Object.entries(themes).map(([key, themeData]) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`px-3 py-2 rounded-lg transition-all ${
            theme === key
              ? 'bg-white shadow-md'
              : 'hover:bg-white/50'
          }`}
          title={themeData.name}
        >
          <span className="text-lg">{themeData.icon}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
