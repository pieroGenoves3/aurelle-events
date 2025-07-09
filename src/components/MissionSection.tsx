
import React from 'react';
import { useContent } from '@/hooks/useContent';

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

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  const backgroundImage = content.backgroundImage;

  return (
    <section 
      id="mission" 
      className="minimal-section bg-gray-50"
    >
      <div className="max-w-4xl mx-auto text-center minimal-reveal">
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8 simple-gradient-text">
          {content.title}
        </h2>
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-700">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <p className="text-2xl font-light text-lilac italic mt-8">
            "{content.quote}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
