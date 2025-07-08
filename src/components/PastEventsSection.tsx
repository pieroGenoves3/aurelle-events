
import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Users, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

interface EventsContent {
  enabled: boolean;
  title: string;
  subtitle: string;
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
    switch (category.toLowerCase()) {
      case 'wedding':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'corporate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fashion':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'social':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentEvent = content.items[currentIndex];

  return (
    <section 
      id="events" 
      className="py-24 px-4"
      style={{ backgroundColor: '#7A7A45' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-cream">
            {content.title}
          </h2>
          <p className="text-xl text-cream/90 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevEvent}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-cream/80 hover:bg-cream border border-golden-brown/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Previous event"
          >
            <ChevronLeft size={20} className="text-dark-purple" />
          </button>

          <button
            onClick={nextEvent}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-cream/80 hover:bg-cream border border-golden-brown/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Next event"
          >
            <ChevronRight size={20} className="text-dark-purple" />
          </button>

          {/* Main Event Card */}
          <div 
            className={`glass-card bg-cream/10 backdrop-blur-sm border border-cream/20 overflow-hidden transition-all duration-300 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(currentEvent.category)}`}>
                  <Tag size={12} className="mr-1" />
                  {currentEvent.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-3xl font-light tracking-tight mb-4 text-cream">
                {currentEvent.title}
              </h3>
              
              <p className="text-cream/80 leading-relaxed mb-6 text-lg">
                {currentEvent.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3 text-cream/70">
                  <Calendar size={18} className="text-golden-brown" />
                  <span>{currentEvent.date}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-cream/70">
                  <MapPin size={18} className="text-golden-brown" />
                  <span>{currentEvent.location}</span>
                </div>
                
                {currentEvent.guests && (
                  <div className="flex items-center space-x-3 text-cream/70">
                    <Users size={18} className="text-golden-brown" />
                    <span>{currentEvent.guests} guests</span>
                  </div>
                )}
              </div>

              {currentEvent.client && (
                <div className="border-t border-cream/20 pt-4">
                  <p className="text-cream/60">
                    Client: <span className="text-golden-brown font-medium">{currentEvent.client}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
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
        </div>
      </div>
    </section>
  );
};

export default PastEventsSection;
