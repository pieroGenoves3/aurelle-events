
import React from 'react';
import { icons } from 'lucide-react';
import { Check, Construction } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServicesContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  headerTitle?: string;
  items: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
    priceRange?: string;
    status?: string;
  }>;
}

const ServicesSection = () => {
  const content = useContent<ServicesContent>('services');
  const { t } = useLanguage();

  if (!content || !content.enabled) {
    return null;
  }

  const backgroundImage = content.backgroundImage;

  return (
    <section 
      id="services" 
      className="py-24 px-4 relative"
      style={{ backgroundColor: 'hsl(var(--aurelle-lavender))' }}
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
          <div className="absolute inset-0 bg-dark-green/80" />
        </>
      )}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-aurelle-champagne font-tenez">
            {content.title}
          </h2>
          <p className="text-xl text-aurelle-champagne/80 max-w-2xl mx-auto font-gantari">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {content.items.map((service, index) => {
            const IconComponent = icons[service.icon as keyof typeof icons];
            const isUnderDevelopment = service.status === 'development';
            
            return (
              <div
                key={index}
                className={`scroll-reveal glass-card p-8 bg-aurelle-brown/60 backdrop-blur-md border border-aurelle-brown/20 transition-all duration-500 group ${
                  isUnderDevelopment ? 'opacity-60' : 'hover:bg-aurelle-champagne/30'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isUnderDevelopment && (
                  <div className="flex items-center justify-center mb-4">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-aurelle-champagne">
                      <Construction size={14} className="text-aurelle-dark-green/80 mr-2" />
                      <span className="text-aurelle-dark-green/80 text-sm font-medium font-gantari">{t.services.underDevelopment}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-aurelle-champagne to-aurelle-brown">
                      <IconComponent size={24} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light tracking-tight mb-3 text-aurelle-dark-green/80 group-hover:text-aurelle-dark-green transition-colors font-tenez">
                      {service.title}
                    </h3>
                  </div>
                </div>
                
                <p className="leading-relaxed mb-6 text-aurelle-dark-green/80 group-hover:text-aurelle-dark-green font-gantari">
                  {isUnderDevelopment 
                    ? t.services.underDevelopmentMessage
                    : service.description
                  }
                </p>
                
                {!isUnderDevelopment && (
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check size={16} className="text-aurelle-champagne group-hover:text-aurelle-dark-green flex-shrink-0" />
                        <span className="text-sm text-aurelle-dark-green/80 group-hover:text-aurelle-dark-green font-gantari">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
