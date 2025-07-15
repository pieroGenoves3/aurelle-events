
import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

interface LocationContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  mapEmbed?: string;
  hours: Array<{
    day: string;
    time: string;
  }>;
}

const LocationSection = () => {
  const content = useContent<LocationContent>('location');

  if (!content || !content.enabled) {
    return null;
  }

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${content.latitude},${content.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <section 
      id="location" 
      className="py-24 px-4"
      style={{ backgroundColor: '#A394B8' }}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="scroll-reveal">
            <div className="relative bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-lg overflow-hidden h-96">
              <iframe
                src={content.mapEmbed || `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${content.latitude},${content.longitude}&zoom=15`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              
              <button
                onClick={openInMaps}
                className="absolute bottom-4 right-4 flex items-center space-x-2 bg-golden-brown text-cream px-4 py-2 rounded-lg hover:bg-golden-brown/90 transition-colors"
              >
                <ExternalLink size={16} />
                <span className="text-sm">Open in Maps</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="scroll-reveal space-y-8">
            <div className="glass-card p-8 bg-cream/10 backdrop-blur-sm border border-cream/20">
              <div className="flex items-start space-x-4 mb-6">
                <MapPin size={24} className="text-golden-brown flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-light text-cream mb-2">Address</h3>
                  <p className="text-cream/80 leading-relaxed">{content.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <Phone size={24} className="text-golden-brown flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-light text-cream mb-2">Phone</h3>
                  <a href={`tel:${content.phone}`} className="text-cream/80 hover:text-golden-brown transition-colors">
                    {content.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <Mail size={24} className="text-golden-brown flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-light text-cream mb-2">Email</h3>
                  <a href={`mailto:${content.email}`} className="text-cream/80 hover:text-golden-brown transition-colors">
                    {content.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock size={24} className="text-golden-brown flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-light text-cream mb-2">Office Hours</h3>
                  <div className="space-y-1">
                    {content.hours.map((hour, index) => (
                      <div key={index} className="flex justify-between text-cream/80">
                        <span>{hour.day}</span>
                        <span>{hour.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
