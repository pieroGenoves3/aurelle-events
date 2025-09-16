
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Users, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/contexts/LanguageContext';

interface EventsContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  headerTitle?: string;
  showNavigation?: boolean;
  selectorPadding?: string;
  items: Array<{
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    image: string;
    client?: string;
    guests?: number;
  }>;
}

const PastEventsSection = () => {
  const content = useContent<EventsContent>('events');
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransition = useCallback((newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 150);
  }, []);

  const nextEvent = useCallback(() => {
    if (!content?.items?.length) return;
    const nextIndex = (currentIndex + 1) % content.items.length;
    handleTransition(nextIndex);
  }, [currentIndex, content?.items?.length, handleTransition]);

  const prevEvent = useCallback(() => {
    if (!content?.items?.length) return;
    const prevIndex = (currentIndex - 1 + content.items.length) % content.items.length;
    handleTransition(prevIndex);
  }, [currentIndex, content?.items?.length, handleTransition]);

  // Auto-advance events every 5 seconds
  useEffect(() => {
    if (!content?.items?.length) return;
    
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % content.items.length;
      handleTransition(nextIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, content?.items?.length, handleTransition]);

  // Early return after all hooks are called
  if (!content || !content.enabled || !content.items.length) {
    return null;
  }

  const getCategoryColor = (category: string) => {
    return 'bg-aurelle-champagne text-aurelle-lignt-green border border-aurelle-champagne';
  };

  const currentEvent = content.items[currentIndex];

  const backgroundImage = content.backgroundImage;
  const hasMultipleItems = content.items.length > 1;

  return (
    <section 
      id="events" 
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
          <div className="absolute inset-0" />
        </>
      )}
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light mb-6 text-aurelle-champagne">
            {content.title}
          </h2>
          <p className="text-xl text-aurelle-champagne/60 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {content.showNavigation && hasMultipleItems && (
            <>
              <button
                onClick={prevEvent}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-cream/80 hover:bg-cream border border-golden-brown/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
                aria-label={t.events.previousEvent}
              >
                <ChevronLeft size={20} className="text-dark-purple" />
              </button>

              <button
                onClick={nextEvent}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-cream/80 hover:bg-cream border border-golden-brown/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
                aria-label={t.events.nextEvent}
              >
                <ChevronRight size={20} className="text-dark-purple" />
              </button>
            </>
          )}

          {/* Main Event Card */}
          <div 
            className={`bg-aurelle-light-green/20 border border-aurelle-dark-green/10 overflow-hidden ${
              hasMultipleItems ? `transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}` : ''
            }`}
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aurelle-champagne/30" />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(currentEvent.category)}`}>
                  <Tag size={12} className="mr-1" />
                  {currentEvent.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-3xl font-light tracking-tight mb-4 text-aurelle-champagne/60">
                {currentEvent.title}
              </h3>
              
              <p className="leading-relaxed mb-6 text-lg text-aurelle-champagne/40">
                {currentEvent.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar size={18} className="text-aurelle-brown" />
                  <span className="text-aurelle-champagne/50">{currentEvent.date}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-aurelle-brown" />
                  <span className="text-aurelle-champagne/50">{currentEvent.location}</span>
                </div>
                
                {currentEvent.guests && (
                  <div className="flex items-center space-x-3">
                    <Users size={18} className="text-aurelle-brown" />
                    <span className="text-aurelle-champagne/50">{currentEvent.guests} {t.events.guests}</span>
                  </div>
                )}
              </div>

              {currentEvent.client && (
                <div className="border-t border-aurelle-champagne/20 pt-4">
                  <p className="text-aurelle-brown">
                    {t.events.client}: <span className="text-aurelle-champagne font-medium">{currentEvent.client}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dots Indicator */}
          {hasMultipleItems && (
            <div className={`flex justify-center space-x-3 ${content.selectorPadding || 'mt-12'}`}>
              {content.items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTransition(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-golden-brown scale-125' 
                      : 'bg-cream/30 hover:bg-cream/50'
                  }`}
                  aria-label={`Go to event ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PastEventsSection;
