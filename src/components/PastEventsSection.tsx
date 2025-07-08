
import React from 'react';
import { Calendar, MapPin, Users, Tag, ExternalLink } from 'lucide-react';
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

  if (!content || !content.enabled) {
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

  return (
    <section 
      id="events" 
      className="py-24 px-4"
      style={{ backgroundColor: '#7A7A45' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-cream">
            {content.title}
          </h2>
          <p className="text-xl text-cream/90 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.items.map((event, index) => (
            <div
              key={index}
              className="scroll-reveal glass-card bg-cream/10 backdrop-blur-sm border border-cream/20 overflow-hidden hover:shadow-lg transition-all duration-500 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-purple/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                    <Tag size={12} className="mr-1" />
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-light tracking-tight mb-3 text-cream group-hover:text-golden-brown transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-cream/80 leading-relaxed mb-4 text-sm">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-cream/70 text-sm">
                    <Calendar size={14} className="text-golden-brown" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-cream/70 text-sm">
                    <MapPin size={14} className="text-golden-brown" />
                    <span>{event.location}</span>
                  </div>
                  
                  {event.guests && (
                    <div className="flex items-center space-x-2 text-cream/70 text-sm">
                      <Users size={14} className="text-golden-brown" />
                      <span>{event.guests} guests</span>
                    </div>
                  )}
                </div>

                {event.client && (
                  <div className="border-t border-cream/20 pt-4">
                    <p className="text-xs text-cream/60">
                      Client: <span className="text-golden-brown">{event.client}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEventsSection;
