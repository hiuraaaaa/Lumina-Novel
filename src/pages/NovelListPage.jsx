import React, { useState, useEffect } from 'react';
import { Book, Filter } from 'lucide-react';
import NovelCard from '../components/common/NovelCard';
import NovelCardSkeleton from '../components/common/NovelCardSkeleton';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';
import EmptyState from '../components/layout/EmptyState';
import apiService from '../services/api';

const NovelListPage = ({ onNovelClick }) => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNovels();
  }, []);

  const loadNovels = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getNovelList();
      console.log('Novel List Data:', data); // Debug
      setNovels(data.novels || []);
    } catch (err) {
      console.error('Load novels error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4 py-6">
          <LoadingSpinner text="Memuat novel..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4 py-6">
          <ErrorMessage message={error} onRetry={loadNovels} />
        </div>
      </div>
    );
  }

  if (!novels || novels.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4 py-6">
          <EmptyState
            title="Tidak Ada Novel"
            description="Belum ada novel yang tersedia"
            action={{
              label: 'Coba Lagi',
              onClick: loadNovels
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center">
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
        </div>

        {/* Novels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default NovelListPage;
