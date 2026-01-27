import { API_ENDPOINTS } from '../config/settings';

// ============================================
// 🌸 API SERVICE
// ============================================

class ApiService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Helper: Get from cache or fetch
  async fetchWithCache(url, options = {}) {
    const cacheKey = url;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Home Page
  async getHome(page = 1) {
    return this.fetchWithCache(API_ENDPOINTS.home(page));
  }

  // Search
  async search(query) {
    if (!query || query.trim() === '') {
      return { results: [] };
    }
    return this.fetchWithCache(API_ENDPOINTS.search(query));
  }

  // Novel Detail
  async getNovelDetail(slug) {
    return this.fetchWithCache(API_ENDPOINTS.detail(slug));
  }

  // Read Chapter
  async getChapter(slug) {
    return this.fetchWithCache(API_ENDPOINTS.read(slug));
  }

  // Genres List
  async getGenres() {
    return this.fetchWithCache(API_ENDPOINTS.genres());
  }

  // Genre Novels
  async getGenreNovels(slug) {
    return this.fetchWithCache(API_ENDPOINTS.genre(slug));
  }

  // Tags List
  async getTags() {
    return this.fetchWithCache(API_ENDPOINTS.tags());
  }

  // Tag Novels
  async getTagNovels(slug) {
    return this.fetchWithCache(API_ENDPOINTS.tag(slug));
  }

  // Novel List (All Novels)
  async getNovelList() {
    return this.fetchWithCache(API_ENDPOINTS.novelList());
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Clear specific cache
  clearCacheByKey(key) {
    this.cache.delete(key);
  }
}

export const apiService = new ApiService();
export default apiService;
