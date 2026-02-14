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
      const result = await response.json();
      
      // Extract data from API response
      const data = result.data || result;
      
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
    const data = await this.fetchWithCache(API_ENDPOINTS.home(page));
    return {
      novels: data.results || [],
      pagination: data.pagination || {},
      featured: (data.results || []).slice(0, 5),
      latest: data.results || [],
      trending: data.results || [],
      popular: data.results || [],
    };
  }

  // Search
  async search(query) {
    if (!query || query.trim() === '') {
      return { results: [] };
    }
    const data = await this.fetchWithCache(API_ENDPOINTS.search(query));
    return {
      results: data.results || [],
      pagination: data.pagination || {}
    };
  }

  // Novel Detail
  async getNovelDetail(slug) {
    const data = await this.fetchWithCache(API_ENDPOINTS.detail(slug));
    return {
      slug: data.slug,
      title: data.title,
      alternativeTitle: data.alt_title,
      image: data.poster,
      synopsis: data.synopsis,
      status: data.status,
      type: data.type,
      rating: parseFloat(data.rating),
      author: data.info?.author,
      genres: data.genres?.map(g => g.name) || [],
      tags: data.info?.tags?.split(', ') || [],
      chapters: data.chapters || [],
      views: data.info?.total_chapter,
    };
  }

  // Read Chapter
  async getChapter(slug) {
    const data = await this.fetchWithCache(API_ENDPOINTS.read(slug));
    return {
      title: data.title,
      content: data.content,
      slug: slug,
      prevSlug: data.navigation?.prev_slug,
      nextSlug: data.navigation?.next_slug,
    };
  }

  // Genres List
  async getGenres() {
    const data = await this.fetchWithCache(API_ENDPOINTS.genres());
    return {
      genres: (data || []).map(g => ({
        name: g.name,
        slug: g.slug,
        count: g.count
      }))
    };
  }

  // Genre Novels
  async getGenreNovels(slug) {
    const data = await this.fetchWithCache(API_ENDPOINTS.genre(slug));
    return {
      genre: slug,
      novels: data.results || [],
      pagination: data.pagination || {}
    };
  }

  // Tags List
  async getTags() {
    const data = await this.fetchWithCache(API_ENDPOINTS.tags());
    return {
      tags: (data || []).map(t => ({
        name: t.name,
        slug: t.slug,
        count: t.count
      }))
    };
  }

  // Tag Novels
  async getTagNovels(slug) {
    const data = await this.fetchWithCache(API_ENDPOINTS.tag(slug));
    return {
      tag: slug,
      novels: data.results || [],
      pagination: data.pagination || {}
    };
  }

  // Novel List (All Novels)
  async getNovelList() {
    const data = await this.fetchWithCache(API_ENDPOINTS.novelList());
    return {
      novels: (data || []).map(n => ({
        title: n.title,
        slug: n.slug,
        type: n.type,
        letter_group: n.letter_group
      })),
      total: data.length || 0
    };
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
