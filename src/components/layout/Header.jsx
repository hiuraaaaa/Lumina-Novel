import React, { useState } from 'react';
import { Search, Menu, X, Home, Book, Tag, Bookmark } from 'lucide-react';
import SITE_CONFIG from '../../config/settings';

const Header = ({ currentPage, onNavigate, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'novels', label: 'Novel', icon: Book },
    { id: 'genres', label: 'Genre', icon: Tag },
    { id: 'bookmarks', label: 'Bookmark', icon: Bookmark },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-sakura-200' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
          >
            {SITE_CONFIG.logo.showIcon && (
              <span className="text-3xl group-hover:scale-110 transition-transform">
                {SITE_CONFIG.logo.icon}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-bold font-serif">
              <span className="text-sakura-600">{SITE_CONFIG.logo.highlight}</span>
              <span className="text-gray-800">
                {SITE_CONFIG.logo.text.replace(SITE_CONFIG.logo.highlight, '')}
              </span>
            </h1>
          </button>

          {/* Desktop Search */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari novel..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-sakura-200 focus:outline-none focus:border-sakura-400 focus:ring-2 focus:ring-sakura-200 transition-all"
              />
            </div>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-sakura-500 to-sakura-600 text-white rounded-full hover:shadow-sakura-lg hover:scale-105 transition-all font-medium"
            >
              Cari
            </button>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  currentPage === item.id
                    ? 'bg-sakura-100 text-sakura-600 font-medium'
                    : 'text-gray-700 hover:text-sakura-500 hover:bg-sakura-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-sakura-50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-sakura-100 pt-4 animate-slide-up">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari novel..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border-2 border-sakura-200 focus:outline-none focus:border-sakura-400"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    currentPage === item.id
                      ? 'bg-sakura-100 text-sakura-600 font-medium'
                      : 'text-gray-700 hover:bg-sakura-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
