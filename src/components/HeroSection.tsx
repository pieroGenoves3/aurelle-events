import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';

interface HeroContent {
  enabled: boolean;
  subtitle: string;
  cta: string;
  imagePadding: string;
}

const HeroSection = () => {
  const { t } = useLanguage();
  const content = useContent<HeroContent>('hero');

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  // Logo size configuration - easily adjustable
  const logoConfig = {
    desktop: {
      height: 'h-50' // Tailwind class for desktop
    },
    mobile: {
      height: 'h-24' // Tailwind class for mobile
    }
  };

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
      style={{ backgroundColor: '#EDE5D6' }}
    >
      {/* Luxury Wedding Photo Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-purple/60 via-lavender/70 to-golden-brown/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Luxury Wedding"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 animate-fade-in-up">
        {/* Logo */}
        <div className={content.imagePadding}>
          <img 
            src="/lovable-uploads/logo-horizontal-cut.png" 
            alt="Aurelle Events" 
            className={`${logoConfig.desktop.height} md:${logoConfig.desktop.height} md:${logoConfig.mobile.height} w-auto object-contain mx-auto drop-shadow-2xl filter brightness-110 contrast-110`}
          />
        </div>
        <p className="text-xl md:text-2xl text-cream font-light max-w-2xl mx-auto leading-relaxed drop-shadow-2xl mb-8 filter brightness-110">
          {content.subtitle}
        </p>
        <button
          onClick={scrollToEvents}
          className="neumorphic-btn sparkle-btn text-lg shadow-2xl"
        >
          {content.cta}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-cream rounded-full flex justify-center drop-shadow-lg">
            <div className="w-1 h-3 bg-cream rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
