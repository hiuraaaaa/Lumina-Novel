import React from 'react';
import NovelCard from '../common/NovelCard';
import NovelCardSkeleton from '../common/NovelCardSkeleton';
import SectionTitle from '../common/SectionTitle';
import { ChevronRight } from 'lucide-react';

const NovelSection = ({ 
  title, 
  subtitle,
  icon,
  novels = [], 
  loading = false,
  onNovelClick,
  onViewAll 
}) => {
  return (
    <section className="mb-12">
      <SectionTitle 
        title={title}
        subtitle={subtitle}
        icon={icon}
        action={onViewAll ? { label: 'Lihat Semua', onClick: onViewAll } : null}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {loading ? (
          <>
            {[...Array(10)].map((_, i) => (
              <NovelCardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {novels.map((novel, index) => (
              <div 
                key={novel.slug || index}
                style={{ animationDelay: `${index * 50}ms` }}
                className="animate-slide-up"
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
    </section>
  );
};

export default NovelSection;
