
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToEvents = () => {
    const element = document.getElementById('events');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'rgb(255, 255, 255)' }}
    >
      {/* Luxury Wedding Photo Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-amber-50/30 to-amber-100/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Luxury Wedding"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white mb-6 drop-shadow-2xl">
          {t.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg mb-8">
          {t.hero.subtitle}
        </p>
        <button
          onClick={scrollToEvents}
          className="neumorphic-btn sparkle-btn text-lg"
        >
          {t.hero.cta}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
