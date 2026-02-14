import React, { useState, useEffect } from 'react';
import { Tag } from 'lucide-react';
import GenreBadge from '../components/common/GenreBadge';
import LoadingSpinner from '../components/layout/LoadingSpinner';
import ErrorMessage from '../components/layout/ErrorMessage';
import apiService from '../services/api';

const GenresPage = ({ onGenreClick }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      setLoading(true);
      const data = await apiService.getGenres();
      setGenres(data.genres || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Memuat genre..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadGenres} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sakura-50 to-white">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-sakura-500 rounded-2xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif text-gray-800">
                Semua Genre
              </h1>
              <p className="text-gray-600">Jelajahi novel berdasarkan genre</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {genres.map((genre, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 30}ms` }}
              className="animate-scale-in"
            >
              <div className="p-6 bg-white rounded-2xl shadow-card hover:shadow-sakura-lg transition-all cursor-pointer group">
                <GenreBadge
                  genre={genre.name || genre}
                  onClick={() => onGenreClick(genre)}
                />
                {genre.count && (
                  <p className="text-sm text-gray-500 mt-2">
                    {genre.count} novels
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenresPage;
