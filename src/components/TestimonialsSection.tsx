
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
      className="minimal-section bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 minimal-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6 simple-gradient-text">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Simple Navigation Buttons */}
          {content.showNavigation && hasMultipleItems && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 minimalist-card w-12 h-12 rounded-full flex items-center justify-center hover:shadow-md transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 minimalist-card w-12 h-12 rounded-full flex items-center justify-center hover:shadow-md transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </>
          )}

          {/* Main Testimonial Card */}
          <div 
            className={`minimalist-card p-12 text-center ${
              hasMultipleItems ? `transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}` : ''
            }`}
          >
            {/* Customer Image */}
            {currentTestimonial.image && (
              <div className="mb-8">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.author}
                  className="w-20 h-20 rounded-full object-cover mx-auto shadow-sm"
                />
              </div>
            )}

            {/* Customer Name and Position */}
            <div className="mb-8">
              <h3 className="text-2xl font-medium text-black mb-2">
                {currentTestimonial.author}
              </h3>
              <p className="text-gray-600">
                {currentTestimonial.position}
                {currentTestimonial.company && (
                  <span className="text-lilac"> • {currentTestimonial.company}</span>
                )}
              </p>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed max-w-2xl mx-auto">
              "{currentTestimonial.quote}"
            </blockquote>
          </div>

          {/* Simple Dots Indicator */}
          {hasMultipleItems && (
            <div className={`flex justify-center space-x-2 ${content.selectorPadding || 'mt-8'}`}>
              {content.items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTransition(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-lilac scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
