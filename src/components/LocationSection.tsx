
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
      style={{ backgroundColor: 'hsl(var(--aurelle-champagne))' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl mb-6 text-aurelle-dark-green">
            {content.title}
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-aurelle-dark-green">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="scroll-reveal">
            <div className="relative border border-aurelle-light-green rounded-lg overflow-hidden h-96">
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
                className="absolute bottom-4 right-4 flex items-center space-x-2 text-aurelle-black hover:text-aurelle-champagne px-4 py-2 rounded-lg bg-aurelle-champagne hover:bg-aurelle-light-green transition-colors"
              >
                <ExternalLink size={16} />
                <span className="text-sm text-aurelle-black hover:text-aurelle-champagne">Open in Maps</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="scroll-reveal space-y-8">
            <div className="glass-card p-8 bg-aurelle-brown/20 backdrop-blur-md border border-aurelle-brown/20">
              <div className="flex items-start space-x-4 mb-6">
                <MapPin size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-light mb-2">Address</h3>
                  <p className="leading-relaxed text-aurelle-light-green">{content.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <Phone size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-light mb-2">Phone</h3>
                  <a href={`tel:${content.phone}`} className="text-aurelle-light-green hover:text-aurelle-dark-green transition-colors">
                    {content.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <Mail size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-light mb-2">Email</h3>
                  <a href={`mailto:${content.email}`} className="text-aurelle-light-green hover:text-aurelle-dark-green transition-colors">
                    {content.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock size={24} className="flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-light mb-2">Office Hours</h3>
                  <div className="space-y-1">
                    {content.hours.map((hour, index) => (
                      <div key={index} className="flex justify-between">
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
