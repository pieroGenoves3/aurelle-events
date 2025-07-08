
import React from 'react';
import { Crown, Users, Sparkles, Heart, Star, Calendar, Check } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

interface ServicesContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  items: Array<{
    icon: string;
    title: string;
    description: string;
    features: string[];
    priceRange?: string;
  }>;
}

const ServicesSection = () => {
  const content = useContent<ServicesContent>('services');

  if (!content || !content.enabled) {
    return null;
  }

  const iconMap = {
    Crown,
    Users,
    Sparkles,
    Heart,
    Star,
    Calendar
  };

  return (
    <section 
      id="services" 
      className="py-24 px-4"
      style={{ backgroundColor: '#383D33' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-cream">
            {content.title}
          </h2>
          <p className="text-xl text-cream/90 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {content.items.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="scroll-reveal glass-card p-8 bg-cream/10 backdrop-blur-sm border border-cream/20 hover:bg-cream/15 transition-all duration-500 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-golden-brown/20 to-lavender/20">
                      <IconComponent size={24} className="text-golden-brown" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light tracking-tight mb-3 text-cream group-hover:text-golden-brown transition-colors">
                      {service.title}
                    </h3>
                    {service.priceRange && (
                      <p className="text-golden-brown font-medium mb-3">
                        {service.priceRange}
                      </p>
                    )}
                  </div>
                </div>
                
                <p className="text-cream/80 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3 text-cream/70">
                      <Check size={16} className="text-golden-brown flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
