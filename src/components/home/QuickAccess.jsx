import React from 'react';
import { Book, Tag, TrendingUp, Clock, Bookmark, Search } from 'lucide-react';

const QuickAccessCard = ({ icon: Icon, title, description, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-2xl ${color} text-white hover:shadow-2xl hover:scale-105 transition-all text-left group`}
    >
      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-white/90 text-sm">{description}</p>
    </button>
  );
};

const QuickAccess = ({ onNavigate }) => {
  const quickLinks = [
    {
      icon: Book,
      title: 'Semua Novel',
      description: 'Jelajahi koleksi lengkap',
      color: 'bg-gradient-to-br from-sakura-500 to-sakura-600',
      action: () => onNavigate('novels')
    },
    {
      icon: Tag,
      title: 'Genre',
      description: 'Cari berdasarkan genre',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      action: () => onNavigate('genres')
    },
    {
      icon: TrendingUp,
      title: 'Trending',
      description: 'Novel paling populer',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      action: () => onNavigate('trending')
    },
    {
      icon: Clock,
      title: 'Terbaru',
      description: 'Update terkini',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      action: () => onNavigate('latest')
    },
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 100}ms` }}
            className="animate-scale-in"
          >
            <QuickAccessCard {...link} onClick={link.action} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickAccess;
