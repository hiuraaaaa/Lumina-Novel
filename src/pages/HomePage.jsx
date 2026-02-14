import React, { useEffect, useState } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import NovelSection from '../components/home/NovelSection';
import FeaturedNovels from '../components/home/FeaturedNovels';
import QuickAccess from '../components/home/QuickAccess';
import GenreCarousel from '../components/home/GenreCarousel';
import apiService from '../services/api';
import { TrendingUp, Clock, Star, BookOpen } from 'lucide-react';

const HomePage = ({ onNavigate, onNovelClick }) => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getHome(1);
      setHomeData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={loadHomeData}
            className="px-6 py-2 bg-sakura-500 text-white rounded-full hover:bg-sakura-600"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero Banner */}
      {homeData?.featured && (
        <HeroBanner
          novels={homeData.featured.slice(0, 5)}
          onNovelClick={onNovelClick}
        />
      )}

      {/* Quick Access */}
      <QuickAccess onNavigate={onNavigate} />

      {/* Trending Novels */}
      {homeData?.trending && (
        <FeaturedNovels
          novels={homeData.trending}
          onNovelClick={onNovelClick}
        />
      )}

      {/* Genre Carousel */}
      {homeData?.genres && (
        <GenreCarousel
          genres={homeData.genres}
          onGenreClick={(genre) => onNavigate('genre', genre)}
        />
      )}

      {/* Latest Updates */}
      {homeData?.latest && (
        <NovelSection
          title="Update Terbaru"
          subtitle="Novel yang baru diperbarui"
          icon={Clock}
          novels={homeData.latest}
          loading={loading}
          onNovelClick={onNovelClick}
          onViewAll={() => onNavigate('latest')}
        />
      )}

      {/* Popular Novels */}
      {homeData?.popular && (
        <NovelSection
          title="Paling Populer"
          subtitle="Novel dengan views terbanyak"
          icon={TrendingUp}
          novels={homeData.popular}
          loading={loading}
          onNovelClick={onNovelClick}
          onViewAll={() => onNavigate('popular')}
        />
      )}

      {/* Completed Novels */}
      {homeData?.completed && (
        <NovelSection
          title="Novel Tamat"
          subtitle="Novel yang sudah selesai"
          icon={Star}
          novels={homeData.completed}
          loading={loading}
          onNovelClick={onNovelClick}
          onViewAll={() => onNavigate('completed')}
        />
      )}

      {/* Ongoing Novels */}
      {homeData?.ongoing && (
        <NovelSection
          title="Sedang Berlangsung"
          subtitle="Novel yang masih ongoing"
          icon={BookOpen}
          novels={homeData.ongoing}
          loading={loading}
          onNovelClick={onNovelClick}
          onViewAll={() => onNavigate('ongoing')}
        />
      )}
    </div>
  );
};

export default HomePage;
