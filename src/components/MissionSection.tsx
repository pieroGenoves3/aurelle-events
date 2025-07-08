
import React from 'react';
import { useContent } from '@/hooks/useContent';

interface MissionContent {
  enabled: boolean;
  title: string;
  paragraphs: string[];
  quote: string;
}

const MissionSection = () => {
  const content = useContent<MissionContent>('mission');

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  return (
    <section 
      id="mission" 
      className="py-24 px-4"
      style={{ backgroundColor: '#A394B8' }}
    >
      <div className="max-w-4xl mx-auto text-center scroll-reveal">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 text-cream">
          {content.title}
        </h2>
        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-cream/90">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p className="text-2xl font-light text-cream italic">
            "{content.quote}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
