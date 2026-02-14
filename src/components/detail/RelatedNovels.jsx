import React from 'react';
import NovelCard from '../common/NovelCard';
import SectionTitle from '../common/SectionTitle';
import { BookOpen } from 'lucide-react';

const RelatedNovels = ({ novels = [], onNovelClick }) => {
  if (!novels || novels.length === 0) return null;

  return (
    <section className="mb-12">
      <SectionTitle
        title="Novel Terkait"
        subtitle="Kamu mungkin juga suka"
        icon={BookOpen}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {novels.slice(0, 10).map((novel, index) => (
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
    </section>
  );
};

export default RelatedNovels;
