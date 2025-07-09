
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
      className="minimal-section bg-gray-50"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {content.items.map((service, index) => {
            const IconComponent = icons[service.icon as keyof typeof icons];
            const isUnderDevelopment = service.status === 'development';
            
            return (
              <div
                key={index}
                className={`minimalist-card p-8 minimal-reveal ${
                  isUnderDevelopment ? 'opacity-60' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {isUnderDevelopment && (
                  <div className="flex items-center justify-center mb-6">
                    <div className="inline-flex items-center px-3 py-2 rounded-full bg-yellow-50 border border-yellow-200">
                      <Construction size={16} className="text-yellow-600 mr-2" />
                      <span className="text-yellow-700 text-sm font-medium">Under Development</span>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
                      <IconComponent size={24} className="text-lilac" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-light tracking-tight mb-3 text-black">
                      {service.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {isUnderDevelopment 
                    ? "We're currently developing this service to bring you exceptional experiences. Stay tuned for updates."
                    : service.description
                  }
                </p>
                
                {!isUnderDevelopment && (
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3 text-gray-600">
                        <Check size={16} className="text-lilac flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
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
