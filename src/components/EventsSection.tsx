
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
      className="minimal-section bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 minimal-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-6 simple-gradient-text">
            Signature Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A curated selection of our most memorable experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="minimal-card p-0 overflow-hidden minimal-reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 text-sm rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-light tracking-tight mb-4 text-black">
                  {event.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
