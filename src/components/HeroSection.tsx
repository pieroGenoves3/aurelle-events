
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #292629 0%, #383d33 100%)' }}
    >
      {/* Background Image with Luxury Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent z-10" />
        <img
          src={backgroundImage}
          alt="Luxury Event Background"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Luxury overlay pattern */}
        <div className="absolute inset-0 z-5 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(163,148,184,0.3) 1px, transparent 0)', backgroundSize: '50px 50px' }} />
      </div>

      {/* Elegant Hero Content */}
      <div className="relative z-20 text-center max-w-6xl mx-auto px-6 animate-fade-in-up">
        {/* Luxury Logo Container */}
        <div className={`${content.imagePadding} relative`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl blur-xl" />
          <img 
            src={logoImage}
            alt="Aurelle Events - Luxury Event Planning" 
            className={`relative ${logoConfig.desktop.height} md:${logoConfig.desktop.height} sm:${logoConfig.mobile.height} w-auto object-contain mx-auto filter brightness-110 contrast-110`}
            style={{ 
              filter: 'drop-shadow(0 10px 30px rgba(163,148,184,0.3)) brightness(1.1) contrast(1.1)',
              maxHeight: '280px'
            }}
          />
        </div>

        {/* Elegant Subtitle */}
        <div className="relative mt-8 mb-12">
          <p className="text-xl md:text-3xl lg:text-4xl text-white font-light max-w-4xl mx-auto leading-relaxed tracking-wide mb-12"
             style={{ 
               textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(163,148,184,0.2)',
               lineHeight: '1.4'
             }}>
            {content.subtitle}
          </p>
          
          {/* Luxury Call-to-Action */}
          <div className="relative inline-block">
            <button
              onClick={scrollToEvents}
              className="luxury-button text-lg px-12 py-4 sparkle-btn relative overflow-hidden group"
              style={{ 
                background: 'linear-gradient(135deg, #a394b8, #a67a40)',
                boxShadow: '0 15px 35px rgba(163,148,184,0.4), 0 5px 15px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <span className="relative z-10 font-semibold tracking-wide">{content.cta}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-luxury-float">
          <div className="w-8 h-14 border-2 border-white/60 rounded-full flex justify-center relative"
               style={{ boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
            <div className="w-1.5 h-4 bg-gradient-to-b from-white to-white/60 rounded-full mt-3 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Luxury floating elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-yellow rounded-full opacity-30 animate-luxury-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-2 h-2 bg-lilac rounded-full opacity-40 animate-luxury-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-4 h-4 bg-white rounded-full opacity-20 animate-luxury-float" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default HeroSection;
