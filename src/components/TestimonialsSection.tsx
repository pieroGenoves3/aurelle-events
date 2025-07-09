
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

interface TestimonialsContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  headerTitle?: string;
  showNavigation?: boolean;
  selectorPadding?: string;
  items: Array<{
    quote: string;
    author: string;
    position: string;
    company?: string;
    image?: string;
    rating: number;
  }>;
}

const TestimonialsSection = () => {
  const content = useContent<TestimonialsContent>('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransition = useCallback((newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 150);
  }, []);

  const nextTestimonial = useCallback(() => {
    if (!content?.items?.length) return;
    const nextIndex = (currentIndex + 1) % content.items.length;
    handleTransition(nextIndex);
  }, [currentIndex, content?.items?.length, handleTransition]);

  const prevTestimonial = useCallback(() => {
    if (!content?.items?.length) return;
    const prevIndex = (currentIndex - 1 + content.items.length) % content.items.length;
    handleTransition(prevIndex);
  }, [currentIndex, content?.items?.length, handleTransition]);

  // Auto-advance testimonials every 6 seconds
  useEffect(() => {
    if (!content?.items?.length) return;
    
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % content.items.length;
      handleTransition(nextIndex);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentIndex, content?.items?.length, handleTransition]);

  // Early return after all hooks are called
  if (!content || !content.enabled || !content.items.length) {
    return null;
  }


  const currentTestimonial = content.items[currentIndex];

  const backgroundImage = content.backgroundImage;
  const hasMultipleItems = content.items.length > 1;

  return (
    <section 
      id="testimonials" 
      className="py-32 px-6 section-champagne relative overflow-hidden"
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
          <div className="absolute inset-0 bg-gradient-to-br from-champagne/90 to-champagne/95" />
        </>
      )}
      
      {/* Elegant pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, hsl(var(--lilac)) 2px, hsl(var(--lilac)) 4px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 scroll-reveal">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-8 luxury-heading luxury-text-gradient">
            {content.title}
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-lilac via-yellow to-lilac mx-auto mb-8 rounded-full" />
          <p className="text-2xl md:text-3xl elegant-text max-w-3xl mx-auto font-light leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {content.showNavigation && hasMultipleItems && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 luxury-card w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1/2 hover:-translate-x-16 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} className="text-lilac" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 luxury-card w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1/2 hover:translate-x-16 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} className="text-lilac" />
              </button>
            </>
          )}

          {/* Main Testimonial Card */}
          <div 
            className={`luxury-card p-12 lg:p-16 text-center relative overflow-hidden ${
              hasMultipleItems ? `transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}` : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Luxury accent corners */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-lilac/10 to-transparent" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow/10 to-transparent" />
            
            {/* Customer Image */}
            {currentTestimonial.image && (
              <div className="mb-10">
                <div className="relative inline-block">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.author}
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-2xl"
                    style={{ boxShadow: '0 20px 40px rgba(163,148,184,0.3)' }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-lilac/20 to-transparent" />
                </div>
              </div>
            )}

            {/* Customer Name and Event */}
            <div className="mb-12">
              <h3 className="text-3xl lg:text-4xl font-medium luxury-heading mb-4">
                {currentTestimonial.author}
              </h3>
              <p className="text-xl text-lilac font-light">
                {currentTestimonial.position}
                {currentTestimonial.company && (
                  <span className="text-yellow"> • {currentTestimonial.company}</span>
                )}
              </p>
            </div>

            {/* Luxury quote decoration */}
            <div className="relative mb-8">
              <div className="absolute -top-6 -left-4 text-6xl text-lilac/20 font-serif">"</div>
              <div className="absolute -bottom-6 -right-4 text-6xl text-yellow/20 font-serif">"</div>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl elegant-text italic leading-relaxed max-w-4xl mx-auto font-light relative z-10">
              {currentTestimonial.quote}
            </blockquote>

            {/* Elegant bottom decoration */}
            <div className="mt-12 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-lilac to-yellow rounded-full" />
            </div>
          </div>

          {/* Dots Indicator */}
          {hasMultipleItems && (
            <div className={`flex justify-center space-x-4 ${content.selectorPadding || 'mt-16'}`}>
              {content.items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTransition(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? 'bg-gradient-to-r from-lilac to-yellow scale-125 shadow-lg' 
                      : 'bg-lilac/30 hover:bg-lilac/50 hover:scale-110'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Luxury footer decoration */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-lilac/40" />
            <div className="w-3 h-3 bg-lilac rounded-full" />
            <div className="w-16 h-px bg-gradient-to-r from-lilac to-yellow" />
            <div className="w-3 h-3 bg-yellow rounded-full" />
            <div className="w-8 h-px bg-gradient-to-r from-yellow/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
