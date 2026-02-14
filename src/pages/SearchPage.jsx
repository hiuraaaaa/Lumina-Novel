import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import NovelCard from '../components/common/NovelCard';
import NovelCardSkeleton from '../components/common/NovelCardSkeleton';
import EmptyState from '../components/layout/EmptyState';
import apiService from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

const SearchPage = ({ initialQuery = '', onNovelClick, onBack }) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      performSearch(debouncedSearchTerm);
    } else {
      setResults([]);
      setSearched(false);
    }
  }, [debouncedSearchTerm]);

  const performSearch = async (query) => {
    try {
      setLoading(true);
      const data = await apiService.search(query);
      setResults(data.results || []);
      setSearched(true);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sakura-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-gray-800 mb-6">
            Cari Novel
          </h1>

          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ketik judul novel yang kamu cari..."
              className="w-full pl-14 pr-12 py-4 text-lg rounded-2xl border-2 border-sakura-200 focus:outline-none focus:border-sakura-400 focus:ring-2 focus:ring-sakura-200 transition-all shadow-lg"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <NovelCardSkeleton key={i} />
            ))}
          </div>
        ) : searched && results.length === 0 ? (
          <EmptyState
            title="Tidak Ada Hasil"
            description={`Tidak menemukan novel dengan kata kunci "${searchTerm}"`}
            action={{
              label: 'Lihat Semua Novel',
              onClick: () => console.log('View all novels')
            }}
          />
        ) : results.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">
              Ditemukan {results.length} novel untuk "{searchTerm}"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {results.map((novel, index) => (
                <div
                  key={novel.slug || index}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-scale-in"
                >
                  <NovelCard
                    novel={novel}
                    onClick={() => onNovelClick(novel)}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">
              Mulai ketik untuk mencari novel favoritmu
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
