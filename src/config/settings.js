export const SITE_CONFIG = {
  // Basic Info
  siteName: "SakuraNovel",
  siteTagline: "Baca Light Novel Bahasa Indonesia",
  siteDescription: "Platform membaca light novel terjemahan terlengkap dengan tampilan modern dan nyaman",
  siteUrl: "https://sakuranovel.vercel.app",
  
  // API Configuration
  apiBase: "https://www.sankavollerei.com/novel/sakuranovel",
  
  // Branding
  logo: {
    text: "SakuraNovel",
    highlight: "Sakura", // Part yang dikasih warna pink
    icon: "🌸", // Sakura emoji
    showIcon: true
  },
  
  // Preloader
  preloader: {
    enabled: true,
    duration: 2500, // ms
    siteName: "SakuraNovel",
    tagline: "Loading Your Reading Journey...",
    animation: "sakura-fall", // sakura-fall, book-flip, fade
    petalCount: 7, // Number of falling petals
    showProgress: true
  },

  // Reading Settings
  reading: {
    defaultTheme: "light", // light, dark, sepia, sakura
    defaultFontSize: 18, // px
    fontSizes: [14, 16, 18, 20, 22], // Available font sizes
    themes: {
      light: {
        name: "Light",
        bg: "#ffffff",
        text: "#2c3e50",
        icon: "☀️"
      },
      dark: {
        name: "Dark",
        bg: "#1a0d2e",
        text: "#e8d7f1",
        icon: "🌙"
      },
      sepia: {
        name: "Sepia",
        bg: "#f4ecd8",
        text: "#5c4a3a",
        icon: "📜"
      },
      sakura: {
        name: "Sakura",
        bg: "linear-gradient(135deg, #fff5f7 0%, #ffe4e9 100%)",
        text: "#2c3e50",
        icon: "🌸"
      }
    }
  },

  // UI Settings
  ui: {
    cardsPerRow: {
      desktop: 4,
      tablet: 3,
      mobile: 2
    },
    animationDuration: 400, // ms
    debounceDelay: 300, // ms for search
    autoScrollInterval: 6000, // ms for hero banner
  },

  // Feature Flags
  features: {
    bookmarks: true,
    readingProgress: true,
    readingHistory: true,
    darkMode: true,
    search: true,
    filters: true,
  },

  // Social Links (optional)
  social: {
    discord: "",
    telegram: "",
    twitter: "",
  }
};

export const API_ENDPOINTS = {
  home: (page = 1) => `${SITE_CONFIG.apiBase}/home?page=${page}`,
  search: (query) => `${SITE_CONFIG.apiBase}/search?q=${encodeURIComponent(query)}`,
  detail: (slug) => `${SITE_CONFIG.apiBase}/detail/${slug}`,
  read: (slug) => `${SITE_CONFIG.apiBase}/read/${slug}`,
  genres: () => `${SITE_CONFIG.apiBase}/genres`,
  genre: (slug) => `${SITE_CONFIG.apiBase}/genre/${slug}`,
  tags: () => `${SITE_CONFIG.apiBase}/tags`,
  tag: (slug) => `${SITE_CONFIG.apiBase}/tag/${slug}`,
  novelList: () => `${SITE_CONFIG.apiBase}/daftar-novel`,
};

export default SITE_CONFIG;
