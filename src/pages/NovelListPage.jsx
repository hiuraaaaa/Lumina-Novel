import React, { useState, useEffect } from 'react';
import { Book, Filter } from 'lucide-react';
import NovelCard from '../components/common/NovelCard';
import NovelCardSkeleton from '../components/common/NovelCardSkeleton';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';
import apiService from '../services/api';

const NovelListPage = ({ onNovelClick }) => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    loadNovels();
  }, [currentPage, sortBy]);

  const loadNovels = async () => {
    try {
      setLoading(true);
      const data = await apiService.getNovelList();
      setNovels(data.novels || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && novels.length === 0) {
    return <LoadingSpinner text="Memuat novel..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadNovels} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sakura-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sakura-500 rounded-2xl flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-gray-800">
                Semua Novel
              </h1>
              <p className="text-gray-600">
                {novels.length} novel tersedia
              </p>
            </div>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-sakura-200 rounded-lg focus:outline-none focus:border-sakura-400"
            >
              <option value="latest">Terbaru</option>
              <option value="popular">Populer</option>
              <option value="rating">Rating</option>
              <option value="title">Judul A-Z</option>
            </select>
          </div>
        </div>

        {/* Novels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {loading ? (
            <>
              {[...Array(20)].map((_, i) => (
                <NovelCardSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {novels.map((novel, index) => (
                <div
                  key={novel.slug || index}
                  style={{ animationDelay: `${index * 30}ms` }}
                  className="animate-scale-in"
                >
                  <NovelCard
                    novel={novel}
                    onClick={() => onNovelClick(novel)}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default NovelListPage;
