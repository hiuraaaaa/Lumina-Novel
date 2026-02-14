import React, { useEffect } from 'react';
import { useReading } from '../../contexts/ReadingContext';
import SITE_CONFIG from '../../config/settings';

const ChapterContent = ({ chapter, novelTitle }) => {
  const { theme, fontSize } = useReading();
  const themeStyles = SITE_CONFIG.reading.themes[theme];

  useEffect(() => {
    // Scroll to top when chapter changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapter]);

  if (!chapter) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Chapter tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div
      className="transition-all duration-300 rounded-2xl p-8 md:p-12 shadow-lg"
      style={{
        background: themeStyles.bg,
        color: themeStyles.text,
      }}
    >
      {/* Chapter Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <p className="text-sm opacity-70 mb-2">{novelTitle}</p>
        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">
          {chapter.title}
        </h1>
        {chapter.date && (
          <p className="text-sm opacity-70">{chapter.date}</p>
        )}
      </div>

      {/* Chapter Content */}
      <div
        className="prose prose-lg max-w-none font-reading"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: '1.8',
          color: themeStyles.text,
        }}
      >
        {chapter.content ? (
          <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
        ) : (
          <p>Konten chapter tidak tersedia</p>
        )}
      </div>

      {/* Chapter Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="opacity-70 text-sm">
          — End of {chapter.title} —
        </p>
      </div>
    </div>
  );
};

export default ChapterContent;
