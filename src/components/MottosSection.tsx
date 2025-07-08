
import React from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

interface MottosContent {
  enabled: boolean;
  title: string;
  subtitle: string;
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

  const iconMap = {
    Sparkles,
    Heart,
    Star
  };

  return (
    <section 
      id="mottos" 
      className="py-24 px-4"
      style={{ backgroundColor: '#EDE5D6' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((motto, index) => {
            const IconComponent = iconMap[motto.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="text-center scroll-reveal glass-card p-8 hover:scale-105 transition-all duration-500 bg-cream/80 backdrop-blur-sm border border-olive-green/20"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
                  <IconComponent size={32} className="text-primary" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-light tracking-tight mb-4">
                  {motto.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
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
