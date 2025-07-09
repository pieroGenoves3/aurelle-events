
import React from 'react';
import { icons } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

interface MottosContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  headerTitle?: string;
  items: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const MottosSection = () => {
  const content = useContent<MottosContent>('mottos');

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  const backgroundImage = content.backgroundImage;

  return (
    <section 
      id="mottos" 
      className="minimal-section bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 minimal-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6 simple-gradient-text">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((motto, index) => {
            const IconComponent = icons[motto.icon as keyof typeof icons];
            return (
              <div
                key={index}
                className="text-center minimalist-card p-8 minimal-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                  <IconComponent size={28} className="text-lilac" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-light tracking-tight mb-4 text-black">
                  {motto.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {motto.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MottosSection;
