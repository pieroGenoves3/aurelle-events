
import React from 'react';
import { icons } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  const backgroundImage = content.backgroundImage;

  return (
    <section 
      id="mottos" 
      className="py-24 px-4 relative"
      style={{ backgroundColor: 'hsl(var(--aurelle-champagne))' }}
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
          <div className="absolute inset-0 bg-cream/80" />
        </>
      )}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-aurelle-black opacity-100">
            {t.mottos.title}
          </h2>
          <p className="text-xl text-aurelle-black/80 max-w-2xl mx-auto opacity-100">
            {t.mottos.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items.map((motto, index) => {
            const IconComponent = icons[motto.icon as keyof typeof icons];
            return (
              <div
                key={index}
                className="text-center scroll-reveal glass-card p-8 hover:scale-105 transition-all duration-500 bg-aurelle-brown/30 backdrop-blur-sm border border-olive-green/20"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-aurelle-champagne via-aurelle-champagne/30 to-aurelle-champagne/0 mb-6">
                  <IconComponent size={32} className="text-primary opacity-100" strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-light tracking-tight mb-4 text-aurelle-black/70 opacity-100">
                  {motto.title}
                </h3>
                <p className="text-aurelle-black/50 leading-relaxed opacity-100">
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
