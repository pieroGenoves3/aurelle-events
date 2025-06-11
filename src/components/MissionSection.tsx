
import React from 'react';

const MissionSection = () => {
  return (
    <section id="mission" className="py-24 px-4 bg-gradient-to-br from-accent/30 to-secondary/20">
      <div className="max-w-4xl mx-auto text-center scroll-reveal">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8">
          Our Mission
        </h2>
        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-muted-foreground">
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
      </div>
    </section>
  );
};

export default MissionSection;
