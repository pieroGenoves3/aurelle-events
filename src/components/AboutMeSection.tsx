import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Linkedin } from 'lucide-react';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

const AboutMeSection = () => {
  const { t } = useLanguage();

  return (
    <section 
      id="about" 
      className="py-16 md:py-24 px-4 backdrop-blur-sm"
      style={{ backgroundColor: 'hsl(var(--aurelle-champagne) / 0.9)' }}
    >
      <div className="max-w-6xl mx-auto scroll-reveal">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image on the left */}
          <div className="order-2 md:order-1">
            <div className="relative group">
              {/* Main image container with luxury styling */}
              <div className="relative">
                {/* Elegant frame/border */}
                <div 
                  className="absolute inset-0 rounded-3xl transform rotate-1 transition-transform duration-500 group-hover:rotate-2"
                  style={{ 
                    background: 'linear-gradient(135deg, hsl(var(--aurelle-champagne)), hsl(var(--aurelle-lavender)))',
                    filter: 'blur(1px)'
                  }}
                />
                <div 
                  className="relative aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white/20 backdrop-blur-sm transform transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: 'hsl(var(--aurelle-light-green))',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <img
                    src="/images/owner-photo.jpg"
                    alt={t.about.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback placeholder
                      e.currentTarget.style.display = 'none';
                      const placeholder = document.createElement('div');
                      placeholder.className = 'w-full h-full flex items-center justify-center text-aurelle-champagne text-lg font-tenez';
                      placeholder.textContent = 'Owner Photo';
                      placeholder.style.backgroundColor = 'hsl(var(--aurelle-light-green))';
                      e.currentTarget.parentNode?.appendChild(placeholder);
                    }}
                  />
                  {/* Subtle overlay gradient for depth */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, hsl(var(--aurelle-champagne) / 0.1) 100%)'
                    }}
                  />
                </div>
              </div>
              
              {/* Luxury decorative elements */}
              <div 
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-70 animate-pulse"
                style={{ 
                  background: 'radial-gradient(circle, hsl(var(--aurelle-lavender)) 0%, hsl(var(--aurelle-lavender) / 0.3) 70%)',
                  filter: 'blur(2px)'
                }}
              />
              <div 
                className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full opacity-50"
                style={{ 
                  background: 'radial-gradient(circle, hsl(var(--aurelle-brown)) 0%, hsl(var(--aurelle-brown) / 0.2) 70%)',
                  filter: 'blur(1px)'
                }}
              />
              
              {/* Floating accent elements */}
              <div 
                className="absolute top-1/4 -left-4 w-3 h-3 rounded-full opacity-80 animate-bounce"
                style={{ 
                  backgroundColor: 'hsl(var(--aurelle-champagne))',
                  animationDelay: '0.5s',
                  animationDuration: '3s'
                }}
              />
              <div 
                className="absolute bottom-1/3 -right-2 w-2 h-2 rounded-full opacity-60 animate-bounce"
                style={{ 
                  backgroundColor: 'hsl(var(--aurelle-lavender))',
                  animationDelay: '1s',
                  animationDuration: '4s'
                }}
              />
            </div>
          </div>

          {/* Content on the right */}
          <div className="order-1 md:order-2 space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-tenez font-medium mb-6 text-aurelle-black">
                {t.about.title}
              </h2>
              <div className="space-y-4 text-lg leading-relaxed font-gantari text-aurelle-black">
                {t.about.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-6">
              <p className="text-sm font-gantari text-aurelle-black/70 mb-4">
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
                  <div 
                    className="p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: 'hsl(var(--aurelle-lavender))' }}
                  >
                    <Instagram className="w-6 h-6 text-aurelle-champagne" />
                  </div>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="LinkedIn"
                >
                  <div 
                    className="p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: 'hsl(var(--aurelle-lavender))' }}
                  >
                    <Linkedin className="w-6 h-6 text-aurelle-champagne" />
                  </div>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="TikTok"
                >
                  <div 
                    className="p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: 'hsl(var(--aurelle-lavender))' }}
                  >
                    <TikTokIcon />
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

export default AboutMeSection;