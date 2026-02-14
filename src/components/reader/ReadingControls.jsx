import React, { useState } from 'react';
import { Settings, Sun, Moon, Plus, Minus, Palette } from 'lucide-react';
import { useReading } from '../../contexts/ReadingContext';
import SITE_CONFIG from '../../config/settings';

const ReadingControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, fontSize, increaseFontSize, decreaseFontSize, canIncrease, canDecrease } = useReading();

  const themes = SITE_CONFIG.reading.themes;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-6 p-4 bg-gradient-to-r from-sakura-500 to-sakura-600 text-white rounded-full shadow-sakura-lg hover:scale-110 transition-all z-30"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Controls Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
          />

          {/* Panel */}
          <div className="fixed bottom-36 right-6 bg-white rounded-2xl shadow-2xl p-6 z-50 w-80 animate-slide-up">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              <span>Pengaturan Baca</span>
            </h3>

            {/* Font Size */}
            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">
                Ukuran Font
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseFontSize}
                  disabled={!canDecrease}
                  className="p-2 rounded-lg bg-sakura-100 hover:bg-sakura-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-5 h-5 text-sakura-600" />
                </button>
                
                <div className="flex-1 text-center">
                  <span className="text-lg font-semibold text-gray-800">
                    {fontSize}px
                  </span>
                </div>

                <button
                  onClick={increaseFontSize}
                  disabled={!canIncrease}
                  className="p-2 rounded-lg bg-sakura-100 hover:bg-sakura-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-5 h-5 text-sakura-600" />
                </button>
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Tema Baca
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(themes).map(([key, themeData]) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      theme === key
                        ? 'border-sakura-500 bg-sakura-50'
                        : 'border-gray-200 hover:border-sakura-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{themeData.icon}</span>
                      <span className="font-medium text-sm">{themeData.name}</span>
                    </div>
                    <div
                      className="w-full h-6 rounded"
                      style={{ background: themeData.bg }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReadingControls;
