
import React, { useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: "Aurelle Events transformed our wedding into a fairytale beyond our wildest dreams. Every detail was perfection.",
      author: "Sofia & Alessandro Benedetti",
      result: "300 guests, Villa San Martino, Tuscany",
      image: "https://images.unsplash.com/photo-1494790108755-2616c7e18b2a?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "The attention to detail and seamless execution made our product launch unforgettable. Truly exceptional service.",
      author: "Charlotte Dubois, CEO Maison Lumière",
      result: "€2.5M in pre-orders within 48 hours",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Every element was perfect. Our guests are still talking about the evening months later. Simply extraordinary.",
      author: "Lord James Wellington",
      result: "Annual charity gala, £850K raised",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Aurelle Events elevated our brand's presence to new heights of sophistication and elegance. Remarkable work.",
      author: "Isabella Rodriguez, Fashion Director",
      result: "Paris Fashion Week afterparty, 400 VIP guests",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollDelay = 50;

    const autoScroll = () => {
      scrollAmount += scrollStep;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const interval = setInterval(autoScroll, scrollDelay);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-r from-secondary/30 to-accent/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
            Client Stories
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Testimonials from our distinguished clientele
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-hidden scroll-reveal"
          style={{
            width: '100%',
            scrollBehavior: 'smooth'
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-96 glass-card p-8"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-foreground/70">{testimonial.result}</p>
                </div>
              </div>
              <blockquote className="text-lg italic text-foreground/70">
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
