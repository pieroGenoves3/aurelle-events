
import React from 'react';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/contexts/LanguageContext';

interface MissionContent {
  enabled: boolean;
  title: string;
  backgroundImage?: string;
  headerTitle?: string;
  paragraphs: string[];
  quote: string;
}

const MissionSection = () => {
  const content = useContent<MissionContent>('mission');
  const { t } = useLanguage();

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  const backgroundImage = content.backgroundImage;

  return (
    <section 
      id="mission" 
      className="py-24 px-4 relative"
      style={{ backgroundColor: 'hsl(var(--aurelle-dark-green))' }}
    >
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-fixed bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              transform: 'translateZ(0)'
            }}
          />
          <div className="absolute inset-0 bg-lavender/80" />
        </>
      )}
      <div className="max-w-6xl mx-auto scroll-reveal relative z-10">
        {/* Mission Content */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 text-cream opacity-100 font-tenez">
            {t.mission.title}
          </h2>
          <div className="space-y-8 text-lg md:text-xl leading-relaxed text-cream font-gantari">
            {t.mission.description.map((paragraph, index) => (
              <p key={index} className="opacity-100">{paragraph}</p>
            ))}
            <p className="text-2xl font-light text-cream italic opacity-100 font-tenez">
              "{t.mission.quote}"
            </p>
          </div>
        </div>

        {/* About Me Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image on the left */}
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative group">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-aurelle-light-green/20 via-transparent to-aurelle-brown/30 z-10" />
                
                {/* Main gradient frame */}
                <div className="absolute inset-0 bg-gradient-to-r from-aurelle-light-green via-aurelle-champagne to-aurelle-brown p-1 rounded-2xl">
                  <div className="w-full h-full bg-aurelle-dark-green rounded-xl overflow-hidden">
                    <img
                      src="/images/owner-photo.jpg"
                      alt={t.about.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'w-full h-full flex items-center justify-center text-aurelle-champagne text-lg font-tenez';
                        placeholder.textContent = 'Owner Photo';
                        placeholder.style.backgroundColor = 'hsl(var(--aurelle-light-green))';
                        e.currentTarget.parentNode?.appendChild(placeholder);
                      }}
                    />
                  </div>
                </div>
                
                {/* Floating glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-aurelle-light-green/30 to-aurelle-champagne/30 rounded-2xl blur-xl transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-aurelle-champagne to-aurelle-light-green rounded-full opacity-70 blur-sm animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-tr from-aurelle-brown to-aurelle-dark-green rounded-full opacity-50 blur-md" />
              <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-bl from-aurelle-light-green/60 to-transparent rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}} />
            </div>
          </div>

          {/* Content on the right */}
          <div className="order-1 md:order-2 space-y-6">
            <div>
              <h3 className="text-4xl md:text-5xl font-tenez font-medium mb-6 text-cream">
                {t.about.title}
              </h3>
              <div className="space-y-4 text-lg leading-relaxed font-gantari text-cream">
                {t.about.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-6">
              <p className="text-sm font-gantari text-cream/70 mb-4">
                {t.about.followMe}
              </p>
              <div className="flex space-x-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Instagram"
                >
                  <div className="p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-aurelle-champagne/20 group-hover:bg-aurelle-champagne/30">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-cream">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="LinkedIn"
                >
                  <div className="p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-aurelle-champagne/20 group-hover:bg-aurelle-champagne/30">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-cream">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
