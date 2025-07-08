
import React from 'react';
import { Star, Quote } from 'lucide-react';
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

  if (!content || !content.enabled) {
    return null;
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-golden-brown fill-golden-brown' : 'text-cream/30'}`}
      />
    ));
  };

  return (
    <section 
      id="testimonials" 
      className="py-24 px-4"
      style={{ backgroundColor: '#EDE5D6' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-foreground">
            {content.title}
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.items.map((testimonial, index) => (
            <div
              key={index}
              className="scroll-reveal glass-card p-8 bg-cream/60 backdrop-blur-sm border border-olive-green/20 hover:shadow-lg transition-all duration-500 relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-4 left-4 opacity-10">
                <Quote size={40} className="text-golden-brown" />
              </div>
              
              <div className="relative">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <blockquote className="text-lg text-foreground/80 italic leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-golden-brown/20"
                    />
                  )}
                  <div>
                    <h4 className="font-medium text-foreground">{testimonial.author}</h4>
                    <p className="text-sm text-foreground/60">
                      {testimonial.position}
                      {testimonial.company && (
                        <span className="text-golden-brown"> • {testimonial.company}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
