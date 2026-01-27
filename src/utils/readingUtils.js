export const calculateScrollPercentage = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  return Math.min(Math.max(scrollPercentage, 0), 100);
};

// Get current chapter index
export const getCurrentChapterIndex = (chapters, currentSlug) => {
  return chapters.findIndex(chapter => chapter.slug === currentSlug);
};

// Get next chapter
export const getNextChapter = (chapters, currentSlug) => {
  const currentIndex = getCurrentChapterIndex(chapters, currentSlug);
  if (currentIndex === -1 || currentIndex === chapters.length - 1) {
    return null;
  }
  return chapters[currentIndex + 1];
};

// Get previous chapter
export const getPreviousChapter = (chapters, currentSlug) => {
  const currentIndex = getCurrentChapterIndex(chapters, currentSlug);
  if (currentIndex <= 0) {
    return null;
  }
  return chapters[currentIndex - 1];
};

// Format chapter number
export const formatChapterNumber = (chapterString) => {
  const match = chapterString.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

// Sort chapters
export const sortChapters = (chapters, order = 'asc') => {
  return [...chapters].sort((a, b) => {
    const numA = formatChapterNumber(a.title);
    const numB = formatChapterNumber(b.title);
    return order === 'asc' ? numA - numB : numB - numA;
  });
};

// Estimate reading progress
export const estimateReadingProgress = (scrollPercentage) => {
  if (scrollPercentage >= 95) return 'completed';
  if (scrollPercentage >= 50) return 'halfway';
  if (scrollPercentage >= 10) return 'started';
  return 'not_started';
};

// Parse chapter content
export const parseChapterContent = (html) => {
  // Remove script tags
  let content = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove style tags
  content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Clean up whitespace
  content = content.replace(/\s+/g, ' ').trim();
  
  return content;
};

// Add reading markers
export const addReadingMarkers = (content, currentPosition) => {
  // Add paragraph IDs for navigation
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const paragraphs = doc.querySelectorAll('p');
  
  paragraphs.forEach((p, index) => {
    p.id = `para-${index}`;
  });
  
  return doc.body.innerHTML;
};

export default {
  calculateScrollPercentage,
  getCurrentChapterIndex,
  getNextChapter,
  getPreviousChapter,
  formatChapterNumber,
  sortChapters,
  estimateReadingProgress,
  parseChapterContent,
  addReadingMarkers,
};
