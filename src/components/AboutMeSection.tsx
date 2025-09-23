import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Linkedin, TikTok } from 'lucide-react';

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
            <div className="relative">
              <div 
                className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: 'hsl(var(--aurelle-light-green))' }}
              >
                <img
                  src="/images/owner-photo.jpg"
                  alt={t.about.imageAlt}
                  className="w-full h-full object-cover"
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
              </div>
              {/* Decorative elements */}
              <div 
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-60"
                style={{ backgroundColor: 'hsl(var(--aurelle-light-green))' }}
              />
              <div 
                className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full opacity-40"
                style={{ backgroundColor: 'hsl(var(--aurelle-brown))' }}
              />
            </div>
          </div>

          {/* Content on the right */}
          <div className="order-1 md:order-2 space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-tenez font-mediumgit  mb-6 text-aurelle-black">
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
                    style={{ backgroundColor: 'hsl(var(--aurelle-dark-green))' }}
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
                    style={{ backgroundColor: 'hsl(var(--aurelle-dark-green))' }}
                  >
                    <Linkedin className="w-6 h-6 text-aurelle-champagne" />
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