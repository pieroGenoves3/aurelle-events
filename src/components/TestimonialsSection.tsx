
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

interface TestimonialsContent {
  enabled: boolean;
  title: string;
  subtitle: string;
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
      setCurrentIndex(prevIndex => (prevIndex + 1) % content.items.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [content?.items?.length]);

  // Early return after all hooks are called
  if (!content || !content.enabled || !content.items.length) {
    return null;
  }


  const currentTestimonial = content.items[currentIndex];

  return (
    <section 
      id="testimonials" 
      className="py-24 px-4"
      style={{ backgroundColor: '#EDE5D6' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-foreground">
            {content.title}
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-cream/80 hover:bg-cream border border-olive-green/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-cream/80 hover:bg-cream border border-olive-green/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} className="text-foreground" />
          </button>

          {/* Main Testimonial Card */}
          <div 
            className={`glass-card p-12 bg-cream/60 backdrop-blur-sm border border-olive-green/20 rounded-2xl text-center transition-all duration-300 ${
              isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Customer Image */}
            {currentTestimonial.image && (
              <div className="mb-8">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.author}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-golden-brown/20 shadow-lg"
                />
              </div>
            )}

            {/* Customer Name and Event */}
            <div className="mb-8">
              <h3 className="text-2xl font-medium text-foreground mb-2">
                {currentTestimonial.author}
              </h3>
              <p className="text-foreground/60 text-lg">
                {currentTestimonial.position}
                {currentTestimonial.company && (
                  <span className="text-golden-brown"> • {currentTestimonial.company}</span>
                )}
              </p>
            </div>


            {/* Testimonial Quote */}
            <blockquote className="text-xl md:text-2xl text-foreground/80 italic leading-relaxed max-w-3xl mx-auto">
              "{currentTestimonial.quote}"
            </blockquote>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {content.items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTransition(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-golden-brown scale-125' 
                    : 'bg-olive-green/30 hover:bg-olive-green/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
