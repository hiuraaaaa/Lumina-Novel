import { API_ENDPOINTS } from '../config/settings';

// ============================================
// 🌸 API SERVICE - FULL VERSION WITH IMAGE FIX
// ============================================

// Helper function untuk fix image URL dengan CORS
const fixImageUrl = (url) => {
  if (!url) return null;
  
  // Kalau URL sudah lengkap, return
  if (url.startsWith('http')) {
    // Fix untuk i0.wp.com images
    if (url.includes('i0.wp.com')) {
      return url.replace('i0.wp.com/', '');
    }
    return url;
  }
  
  return url;
};

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
      console.log('📦 Cache hit:', url);
      return cached.data;
    }

    try {
      console.log('🌐 Fetching:', url);
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Response received');
      
      // Extract data from API response
      const data = result.data || result;
      
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  }

  // Home Page
  async getHome(page = 1) {
    try {
      const data = await this.fetchWithCache(API_ENDPOINTS.home(page));
      
      const novels = data.results || [];
      
      return {
        novels: novels.map(novel => ({
          slug: novel.slug,
          title: novel.title,
          image: fixImageUrl(novel.poster),
          poster: fixImageUrl(novel.poster),
          type: novel.type,
          status: novel.status || 'Unknown',
          rating: novel.rating,
          latestChapter: novel.latest_chapter,
          latest_chapter: novel.latest_chapter
        })),
        pagination: data.pagination || {},
        featured: novels.slice(0, 5).map(novel => ({
          slug: novel.slug,
          title: novel.title,
          image: fixImageUrl(novel.poster),
          poster: fixImageUrl(novel.poster),
          type: novel.type,
          status: novel.status || 'Unknown',
          rating: novel.rating,
          latestChapter: novel.latest_chapter,
          description: novel.synopsis || 'Deskripsi tidak tersedia'
        })),
        latest: novels.map(novel => ({
          slug: novel.slug,
          title: novel.title,
          image: fixImageUrl(novel.poster),
          poster: fixImageUrl(novel.poster),
          type: novel.type,
          status: novel.status || 'Unknown',
          rating: novel.rating,
          latestChapter: novel.latest_chapter
        })),
        trending: novels.map(novel => ({
          slug: novel.slug,
          title: novel.title,
          image: fixImageUrl(novel.poster),
          poster: fixImageUrl(novel.poster),
          type: novel.type,
          status: novel.status || 'Unknown',
          rating: novel.rating,
          latestChapter: novel.latest_chapter,
          views: '1M+'
        })),
        popular: novels.map(novel => ({
          slug: novel.slug,
          title: novel.title,
          image: fixImageUrl(novel.poster),
          poster: fixImageUrl(novel.poster),
          type: novel.type,
          status: novel.status || 'Unknown',
          rating: novel.rating,
          latestChapter: novel.latest_chapter
        })),
      };
    } catch (error) {
      console.error('Get home error:', error);
      return {
        novels: [],
        pagination: {},
        featured: [],
        latest: [],
        trending: [],
        popular: []
      };
    }
  }

  // Search
  async search(query) {
    if (!query || query.trim() === '') {
      return { results: [], pagination: {} };
    }
    
    try {
      const data = await this.fetchWithCache(API_ENDPOINTS.search(query));
      
      return {
        results: (data.results || []).map(novel => ({
          slug: novel.slug,
          title: novel.title,
          image: fixImageUrl(novel.poster),
          poster: fixImageUrl(novel.poster),
          type: novel.type,
          status: novel.status || 'Unknown',
          rating: novel.rating
        })),
        pagination: data.pagination || {}
      };
    } catch (error) {
      console.error('Search error:', error);
      return { results: [], pagination: {} };
    }
  }

  // Novel Detail
  async getNovelDetail(slug) {
    try {
      const data = await this.fetchWithCache(API_ENDPOINTS.detail(slug));
      
      return {
        slug: data.slug,
        title: data.title,
        alternativeTitle: data.alt_title,
        image: fixImageUrl(data.poster),
        poster: fixImageUrl(data.poster),
        synopsis: data.synopsis || 'Sinopsis tidak tersedia',
        status: data.status || 'Unknown',
        type: data.type,
        rating: parseFloat(data.rating) || 0,
        author: data.info?.author,
        country: data.info?.country,
        published: data.info?.published,
        volume: data.info?.volume,
        genres: (data.genres || []).map(g => g.name || g),
        tags: data.info?.tags ? data.info.tags.split(', ') : [],
        chapters: (data.chapters || []).map(ch => ({
          slug: ch.slug,
          title: ch.title,
          date: ch.date,
          read_endpoint: ch.read_endpoint
        })),
        views: data.info?.total_chapter || '0',
        updatedAt: data.chapters?.[0]?.date || 'Unknown'
      };
    } catch (error) {
      console.error('Get novel detail error:', error);
      throw error;
    }
  }

  // Read Chapter
  async getChapter(slug) {
    try {
      const data = await this.fetchWithCache(API_ENDPOINTS.read(slug));
      
      return {
        title: data.title,
        content: data.content || '<p>Konten tidak tersedia</p>',
        slug: slug,
        date: data.date,
        prevSlug: data.navigation?.prev_slug,
        nextSlug: data.navigation?.next_slug,
        parentSlug: data.navigation?.parent_slug,
        navigation: data.navigation
      };
    } catch (error) {
      console.error('Get chapter error:', error);
      throw error;
    }
  }

  // Genres List
  async getGenres() {
    try {
      const data = await this.fetchWithCache(API_ENDPOINTS.genres());
      
      const genresList = Array.isArray(data) ? data : (data.data || []);
      
      return {
        genres: genresList.map(g => ({
          name: g.name,
          slug: g.slug,
          count: g.count,
          endpoint: g.endpoint
        }))
      };
    } catch (error) {
      console.error('Get genres error:', error);
      return { genres: [] };
    }
  }

  // Genre Novels
  async getGenreNovels(slug, page = 1) {
    try {
      const url = page > 1 
        ? `${API_ENDPOINTS.genre(slug)}?page=${page}`
        : API_ENDPOINTS.genre(slug);
        
      const data = await this.fetchWithCache(url);
      
      return {
        genre: slug,
        novels: (data.results || []).map(novel => ({
          slug: novel.slug,
          title: novel.title,
          image: fixImageUrl(novel.poster),
          poster: fixImageUrl(novel.poster),
          type: novel.type,
          status: novel.status || 'Unknown',
          rating: novel.rating
        })),
        pagination: data.pagination || {}
      };
    } catch (error) {
      console.error('Get genre novels error:', error);
      return { genre: slug, novels: [], pagination: {} };
    }
  }

  // Tags List
  async getTags() {
    try {
      const data = await this.fetchWithCache(API_ENDPOINTS.tags());
      
      const tagsList = Array.isArray(data) ? data : (data.data || []);
      
      return {
        tags: tagsList.map(t => ({
          name: t.name,
          slug: t.slug,
          count: t.count,
          endpoint: t.endpoint
        }))
      };
    } catch (error) {
      console.error('Get tags error:', error);
      return { tags: [] };
    }
  }

  // Tag Novels
  async getTagNovels(slug, page = 1) {
    try {
      const url = page > 1 
        ? `${API_ENDPOINTS.tag(slug)}?page=${page}`
        : API_ENDPOINTS.tag(slug);
        
      const data = await this.fetchWithCache(url);
      
      return {
        tag: slug,
        novels: (data.results || []).map(novel => ({
          slug: novel.slug,
          title: novel.title,
          image: fixImageUrl(novel.poster),
          poster: fixImageUrl(novel.poster),
          type: novel.type,
          status: novel.status || 'Unknown',
          rating: novel.rating
        })),
        pagination: data.pagination || {}
      };
    } catch (error) {
      console.error('Get tag novels error:', error);
      return { tag: slug, novels: [], pagination: {} };
    }
  }

  // Novel List (All Novels)
  async getNovelList() {
    try {
      const data = await this.fetchWithCache(API_ENDPOINTS.novelList());
      
      const novelsList = Array.isArray(data) ? data : (data.data || data);
      
      return {
        novels: novelsList.map(n => ({
          title: n.title,
          slug: n.slug,
          type: n.type,
          poster: fixImageUrl(n.poster) || `https://placehold.co/300x450/ff69b4/white?text=${encodeURIComponent(n.title.substring(0, 20))}`,
          image: fixImageUrl(n.poster) || `https://placehold.co/300x450/ff69b4/white?text=${encodeURIComponent(n.title.substring(0, 20))}`,
          letter_group: n.letter_group
        })),
        total: novelsList.length || 0
      };
    } catch (error) {
      console.error('Get novel list error:', error);
      return { novels: [], total: 0 };
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    console.log('🗑️ Cache cleared');
  }

  // Clear specific cache
  clearCacheByKey(key) {
    this.cache.delete(key);
    console.log('🗑️ Cache cleared for:', key);
  }

  // Get cache stats
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export const apiService = new ApiService();
export default apiService;
