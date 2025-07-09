
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';

interface HeroContent {
  enabled: boolean;
  subtitle: string;
  cta: string;
  imagePadding: string;
  backgroundImage?: string;
  logoImage?: string;
  logoHeightDesktop?: string;
  logoHeightMobile?: string;
}

const HeroSection = () => {
  const { t } = useLanguage();
  const content = useContent<HeroContent>('hero');

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  // Logo configuration with CMS values or fallbacks
  const logoConfig = {
    desktop: {
      height: content.logoHeightDesktop || 'h-50'
    },
    mobile: {
      height: content.logoHeightMobile || 'h-24'
    }
  };

  // Background image with CMS value or fallback
  const backgroundImage = content.backgroundImage || "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";

  // Logo image with CMS value or fallback
  const logoImage = content.logoImage || "/lovable-uploads/logo-horizontal-cut.png";

  const scrollToEvents = () => {
    const element = document.getElementById('events');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="minimal-hero relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(163,148,184,0.1) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      
      {/* Minimalist Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Clean Logo */}
        <div className={`${content.imagePadding} mb-12`}>
          <img 
            src={logoImage}
            alt="Aurelle Events" 
            className={`${logoConfig.desktop.height} md:${logoConfig.desktop.height} sm:${logoConfig.mobile.height} w-auto object-contain mx-auto animate-gentle-float`}
            style={{ maxHeight: '200px' }}
          />
        </div>

        {/* Elegant Typography */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 text-black leading-tight">
          {content.subtitle}
        </h1>
        
        {/* Minimalist CTA */}
        <button
          onClick={scrollToEvents}
          className="luxury-minimal-button text-base px-12 py-4 mb-16"
        >
          {content.cta}
        </button>

        {/* Simple scroll indicator */}
        <div className="animate-gentle-float">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-lilac to-transparent mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
