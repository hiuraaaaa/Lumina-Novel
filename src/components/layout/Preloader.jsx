import React from 'react';
import SITE_CONFIG from '../../config/settings';

const SakuraPetal = ({ delay, duration }) => (
  <div 
    className="absolute text-4xl opacity-70 animate-fall"
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  >
    🌸
  </div>
);

const Preloader = ({ progress }) => {
  const { preloader } = SITE_CONFIG;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sakura-50 via-sakura-100 to-sakura-200 overflow-hidden">
      {/* Falling Petals */}
      <div className="absolute inset-0">
        {[...Array(preloader.petalCount)].map((_, i) => (
          <SakuraPetal 
            key={i} 
            delay={i * 0.4} 
            duration={3 + Math.random() * 2}
          />
        ))}
      </div>

      {/* Content */}
      <div className="text-center z-10 px-4">
        {/* Logo */}
        <div className="mb-8 animate-float">
          <div className="text-7xl mb-4">🌸</div>
          <h1 className="text-5xl md:text-6xl font-bold font-serif">
            <span className="text-sakura-600">{SITE_CONFIG.logo.highlight}</span>
            <span className="text-gray-800">{SITE_CONFIG.logo.text.replace(SITE_CONFIG.logo.highlight, '')}</span>
          </h1>
          <p className="text-gray-600 mt-3 text-lg">{preloader.tagline}</p>
        </div>

        {/* Progress Bar */}
        {preloader.showProgress && (
          <div className="w-64 md:w-80 mx-auto">
            <div className="h-2 bg-white rounded-full overflow-hidden shadow-lg">
              <div 
                className="h-full bg-gradient-to-r from-sakura-400 to-sakura-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sakura-600 mt-3 font-semibold text-sm">
              {Math.round(progress)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preloader;
