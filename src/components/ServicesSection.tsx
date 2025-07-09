
import React from 'react';
import { icons } from 'lucide-react';
import { Check, Construction } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

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

  if (!content || !content.enabled) {
    return null;
  }

  const backgroundImage = content.backgroundImage;

  return (
    <section 
      id="services" 
      className="py-32 px-6 section-dark relative overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-dark-green/70 to-black/90" />
        </>
      )}
      
      {/* Luxury pattern overlay */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 2px, transparent 0)', backgroundSize: '80px 80px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 scroll-reveal">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-8 text-white">
            {content.title}
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-lilac via-yellow to-lilac mx-auto mb-8 rounded-full" />
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto font-light leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {content.items.map((service, index) => {
            const IconComponent = icons[service.icon as keyof typeof icons];
            const isUnderDevelopment = service.status === 'development';
            
            return (
              <div
                key={index}
                className={`scroll-reveal luxury-card p-10 transition-all duration-700 group relative overflow-hidden ${
                  isUnderDevelopment ? 'opacity-70' : 'hover:transform hover:-translate-y-2'
                }`}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Luxury accent line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lilac via-yellow to-lilac" />
                
                {isUnderDevelopment && (
                  <div className="flex items-center justify-center mb-6">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow/20 to-yellow/30 border border-yellow/40">
                      <Construction size={16} className="text-yellow mr-3" />
                      <span className="text-yellow font-semibold text-sm tracking-wide">Under Development</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-lilac/20 to-yellow/20 relative overflow-hidden">
                      <IconComponent size={32} className="text-lilac relative z-10" strokeWidth={1.5} />
                      <div className="absolute inset-0 bg-gradient-to-br from-lilac/10 to-yellow/10 blur-xl" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-light tracking-tight mb-4 luxury-heading group-hover:text-lilac transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                </div>
                
                <p className="elegant-text text-lg leading-relaxed mb-8">
                  {isUnderDevelopment 
                    ? "We're currently developing this service to bring you exceptional experiences. Stay tuned for exciting updates!"
                    : service.description
                  }
                </p>
                
                {!isUnderDevelopment && (
                  <div className="space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-4 group/feature">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-lilac to-yellow flex items-center justify-center">
                          <Check size={14} className="text-white" strokeWidth={2} />
                        </div>
                        <span className="elegant-text group-hover/feature:text-lilac transition-colors duration-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Luxury bottom decoration */}
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-lilac/10 to-transparent rounded-tl-3xl" />
              </div>
            );
          })}
        </div>

        {/* Elegant section footer */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center space-x-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/40" />
            <div className="w-4 h-4 bg-gradient-to-r from-lilac to-yellow rounded-full" />
            <div className="w-24 h-px bg-gradient-to-r from-white/40 via-lilac/40 to-white/40" />
            <div className="w-4 h-4 bg-gradient-to-r from-yellow to-lilac rounded-full" />
            <div className="w-12 h-px bg-gradient-to-r from-white/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
