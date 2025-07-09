
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
      className="py-24 px-4 max-w-7xl mx-auto"
      style={{ backgroundColor: 'rgb(255, 255, 255)' }}
    >
      <div className="text-center mb-16 scroll-reveal">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
          Signature Events
        </h2>
        <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
          A curated selection of our most memorable luxury experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="group scroll-reveal glass-card overflow-hidden hover:scale-105 transition-all duration-500"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="glass-card px-3 py-1 text-sm text-white">
                  {event.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-light tracking-tight mb-3">
                {event.title}
              </h3>
              <p className="text-foreground/70">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
