
import React, { useState } from 'react';
import { Sparkles, Heart, Award } from 'lucide-react';

const MissionSection = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const missionValues = [
    {
      id: 'elegance',
      title: 'Elegance',
      icon: Sparkles,
      description: 'Every detail is meticulously crafted to embody sophistication and refined beauty, creating an atmosphere of timeless grace.'
    },
    {
      id: 'passion',
      title: 'Passion',
      icon: Heart,
      description: 'We pour our hearts into every celebration, bringing genuine enthusiasm and dedication to make your special moments extraordinary.'
    },
    {
      id: 'excellence',
      title: 'Excellence',
      icon: Award,
      description: 'Our commitment to the highest standards ensures that every aspect of your event exceeds expectations and creates lasting memories.'
    }
  ];

  return (
    <section id="mission" className="py-24 px-4 bg-gradient-to-br from-accent/30 to-secondary/20">
      <div className="max-w-4xl mx-auto text-center scroll-reveal">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8">
          Our Mission
        </h2>
        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-foreground/80">
          <p>
            At Aurelle Events, we believe that life's most precious moments deserve to be celebrated 
            with unparalleled beauty and sophistication. Our mission is to transform your dreams into 
            extraordinary realities, creating experiences that linger in memory long after the last 
            guest has departed.
          </p>
          <p>
            We are passionate artisans of celebration, dedicated to crafting bespoke events that 
            reflect your unique story and vision. From intimate gatherings to grand galas, we pour 
            our hearts into every detail, ensuring that each moment is infused with elegance, 
            emotion, and excellence.
          </p>
          <p className="text-2xl font-light text-foreground italic">
            "We don't just plan events—we create timeless experiences that celebrate the art of living beautifully."
          </p>
        </div>

        {/* Mission Values Buttons */}
        <div className="flex justify-center gap-6 mt-12 relative">
          {missionValues.map((value) => {
            const IconComponent = value.icon;
            return (
              <div key={value.id} className="relative">
                <button
                  className="neumorphic-btn sparkle-btn relative px-6 py-3"
                  onMouseEnter={() => setHoveredButton(value.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  {value.title}
                </button>

                {/* Modal Popup */}
                {hoveredButton === value.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-50 animate-fade-in">
                    <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl p-6 w-80">
                      {/* Icon */}
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                        {value.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-foreground/70 leading-relaxed text-center">
                        {value.description}
                      </p>

                      {/* Arrow pointer */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/95"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
