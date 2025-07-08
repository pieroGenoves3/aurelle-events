
import React, { useState } from 'react';
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
  hours: Array<{
    day: string;
    time: string;
  }>;
}

const LocationSection = () => {
  const content = useContent<LocationContent>('location');
  const [mapboxToken, setMapboxToken] = useState('');

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
              {!mapboxToken ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <MapPin size={48} className="text-golden-brown mb-4" />
                  <h3 className="text-xl font-light text-cream mb-4">Interactive Map</h3>
                  <p className="text-cream/70 mb-6 text-sm">
                    To view the interactive map, please enter your Mapbox public token:
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your Mapbox token"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="w-full max-w-sm px-4 py-2 rounded-lg bg-cream/20 border border-cream/30 text-cream placeholder-cream/50 focus:outline-none focus:ring-2 focus:ring-golden-brown/50"
                  />
                  <p className="text-xs text-cream/50 mt-2">
                    Get your token at{' '}
                    <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-golden-brown hover:underline">
                      mapbox.com
                    </a>
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-cream">
                    <MapPin size={48} className="text-golden-brown mx-auto mb-4" />
                    <p className="text-sm">Map would load here with Mapbox integration</p>
                  </div>
                </div>
              )}
              
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
