
import React from 'react';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/contexts/LanguageContext';

interface MissionContent {
  enabled: boolean;
  title: string;
  backgroundImage?: string;
  headerTitle?: string;
  paragraphs: string[];
  quote: string;
}

const MissionSection = () => {
  const content = useContent<MissionContent>('mission');
  const { t } = useLanguage();

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  const backgroundImage = content.backgroundImage;

  return (
    <section 
      id="mission" 
      className="py-24 px-4 relative"
      style={{ backgroundColor: 'hsl(var(--aurelle-dark-green))' }}
    >
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-fixed bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              transform: 'translateZ(0)'
            }}
          />
          <div className="absolute inset-0 bg-lavender/80" />
        </>
      )}
      <div className="max-w-4xl mx-auto text-center scroll-reveal relative z-10">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 text-cream opacity-100 font-tenez">
          {t.mission.title}
        </h2>
        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-cream font-gantari">
          {t.mission.description.map((paragraph, index) => (
            <p key={index} className="opacity-100">{paragraph}</p>
          ))}
          <p className="text-2xl font-light text-cream italic opacity-100 font-tenez">
            "{t.mission.quote}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
