
import React from 'react';

const EventsSection = () => {
  const events = [
    {
      title: "Milan Fashion Week Gala",
      description: "An exclusive after-party for Valentino's Spring Collection",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=80",
      category: "Fashion"
    },
    {
      title: "Château Wedding in Provence",
      description: "A three-day celebration in the French countryside",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      category: "Wedding"
    },
    {
      title: "Corporate Summit Monaco",
      description: "Luxury tech summit with 500+ C-level executives",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      category: "Corporate"
    },
    {
      title: "Venice Art Biennale Opening",
      description: "Private viewing and dinner for international collectors",
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=800&q=80",
      category: "Cultural"
    }
  ];

  return (
    <section 
      id="events" 
      className="py-32 px-6 section-white relative overflow-hidden"
    >
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{ backgroundImage: 'linear-gradient(45deg, hsl(var(--lilac)) 25%, transparent 25%), linear-gradient(-45deg, hsl(var(--lilac)) 25%, transparent 25%)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 scroll-reveal">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-8 luxury-heading luxury-text-gradient">
            Signature Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-lilac to-yellow mx-auto mb-8 rounded-full" />
          <p className="text-2xl md:text-3xl elegant-text max-w-3xl mx-auto font-light leading-relaxed">
            A curated selection of our most memorable luxury experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {events.map((event, index) => (
            <div
              key={index}
              className="group scroll-reveal elegant-card overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-6 right-6">
                  <span className="elegant-card px-4 py-2 text-sm font-medium text-white backdrop-blur-sm bg-white/20 border border-white/30">
                    {event.category}
                  </span>
                </div>
                {/* Luxury corner accent */}
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-lilac/20 to-transparent" />
              </div>
              
              <div className="p-8 lg:p-10 bg-white">
                <h3 className="text-3xl lg:text-4xl font-light tracking-tight mb-6 luxury-heading">
                  {event.title}
                </h3>
                <p className="elegant-text text-lg leading-relaxed">
                  {event.description}
                </p>
                
                {/* Elegant bottom accent */}
                <div className="mt-8 pt-6 border-t border-lilac/20">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-1 bg-gradient-to-r from-lilac to-yellow rounded-full" />
                    <span className="text-sm font-medium text-lilac tracking-wide uppercase">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Luxury bottom decoration */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-4">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-lilac" />
            <div className="w-3 h-3 bg-lilac rounded-full" />
            <div className="w-16 h-px bg-gradient-to-r from-lilac to-yellow" />
            <div className="w-3 h-3 bg-yellow rounded-full" />
            <div className="w-8 h-px bg-gradient-to-r from-yellow to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
