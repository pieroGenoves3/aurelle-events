
import React from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

const MottosSection = () => {
  const mottos = [
    {
      icon: Sparkles,
      title: "Elegance",
      description: "We believe that true luxury lies in the perfect harmony of sophistication and refinement, creating moments that transcend the ordinary."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Every event is crafted with unwavering dedication and genuine care, ensuring that your vision becomes a breathtaking reality."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We pursue perfection in every detail, from the grandest gesture to the smallest touch, delivering experiences that exceed expectations."
    }
  ];

  return (
    <section 
      id="mottos" 
      className="py-24 px-4"
      style={{ backgroundColor: 'rgb(255, 255, 255)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
            Our Philosophy
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            The principles that guide every extraordinary event we create
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mottos.map((motto, index) => (
            <div
              key={index}
              className="text-center scroll-reveal glass-card p-8 hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
                <motto.icon size={32} className="text-primary" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-4">
                {motto.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {motto.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MottosSection;
