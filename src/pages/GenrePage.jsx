import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import NovelCard from '../components/common/NovelCard';
import NovelCardSkeleton from '../components/common/NovelCardSkeleton';
import EmptyState from '../components/layout/EmptyState';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';
import apiService from '../services/api';

const GenrePage = ({ genreSlug, onBack, onNovelClick }) => {
  const [novels, setNovels] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGenreNovels();
  }, [genreSlug]);

  const loadGenreNovels = async () => {
    try {
      setLoading(true);
      const data = await apiService.getGenreNovels(genreSlug);
      setNovels(data.novels || []);
      setGenreName(data.genre || genreSlug);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Memuat novel..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadGenreNovels} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sakura-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-sakura-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Kembali</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-gray-800 mb-2">
            Genre: {genreName}
          </h1>
          <p className="text-gray-600">
            {novels.length} novel ditemukan
          </p>
        </div>

        {/* Novels Grid */}
        {novels.length === 0 ? (
          <EmptyState
            title="Tidak Ada Novel"
            description="Belum ada novel dalam genre ini"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {novels.map((novel, index) => (
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
        )}
      </div>
    </div>
  );
};

export default GenrePage;
