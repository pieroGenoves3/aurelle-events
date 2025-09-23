
import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();

  // Logo configuration - easily adjustable
  const logoConfig = {
    desktop: {
      height: 'h-10', // Tailwind class for desktop logo height
      padding: 'py-3' // Header padding to accommodate logo
    },
    mobile: {
      height: 'h-8', // Tailwind class for mobile logo height
      padding: 'py-2' // Header padding to accommodate logo
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Get all content sections to build dynamic navigation
  const heroContent = useContent('hero');
  // const mottosContent = useContent('mottos');
  // const servicesContent = useContent('services');
  // const testimonialsContent = useContent('testimonials');
  // const eventsContent = useContent('events');
  const missionContent = useContent('mission');
  const contactContent = useContent('contact');

  // Build navigation items dynamically based on enabled sections
  const navigationItems = useMemo(() => {
    const items = [];
    
    if ((heroContent as any)?.enabled) {
      items.push({ 
        name: t.navigation.home, 
        id: 'hero',
        order: 0
      });
    }
    
    // if ((mottosContent as any)?.enabled) {
    //   items.push({ 
    //     name: t.navigation.about, 
    //     id: 'mottos',
    //     order: 1
    //   });
    // }
    
    // if ((servicesContent as any)?.enabled) {
    //   items.push({ 
    //     name: t.navigation.services, 
    //     id: 'services',
    //     order: 2
    //   });
    // }
    
    // if ((testimonialsContent as any)?.enabled) {
    //   items.push({ 
    //     name: t.navigation.testimonials, 
    //     id: 'testimonials',
    //     order: 3
    //   });
    // }
    
    // if ((eventsContent as any)?.enabled) {
    //   items.push({ 
    //     name: t.navigation.events, 
    //     id: 'events',
    //     order: 4
    //   });
    // }
    
    if ((missionContent as any)?.enabled) {
      items.push({ 
        name: t.navigation.mission, 
        id: 'mission',
        order: 2
      });
    }
    
    if ((contactContent as any)?.enabled) {
      items.push({ 
        name: t.navigation.contact, 
        id: 'contact', // Link to hero section where the form is
        order: 3
      });
    }
    
    return items.sort((a, b) => a.order - b.order);
  }, [
    heroContent, 
    missionContent,
    // mottosContent, 
    // servicesContent, 
    // testimonialsContent, 
    // eventsContent,  
    contactContent, 
    t.navigation
  ]);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/20 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center ${logoConfig.mobile.padding} md:${logoConfig.desktop.padding} md:justify-between`}>
            {/* Mobile Layout - Center aligned logo and hamburger */}
            <div className="flex md:hidden items-center justify-between w-full">
              <div></div> {/* Empty spacer */}
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/monograma.png" 
                  alt="Aurelle Events" 
                  className={`${logoConfig.mobile.height} w-auto object-contain`}
                />
              </div>
              <button
                className={`text-foreground relative w-6 h-6 flex items-center justify-center transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="relative flex items-center justify-center">
                  <Menu 
                    size={24} 
                    className={`absolute transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen 
                        ? 'opacity-0 rotate-180 scale-75' 
                        : 'opacity-100 rotate-0 scale-100'
                    }`}
                  />
                  <X 
                    size={24} 
                    className={`absolute transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen 
                        ? 'opacity-100 rotate-0 scale-100' 
                        : 'opacity-0 rotate-180 scale-75'
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Desktop Layout */}
            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-aurelle-champagne hover:text-aurelle-brown transition-all duration-200 font-medium tracking-wide hover:scale-105 font-gantari"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector - Right side */}
            <div className="hidden md:flex items-center space-x-1">
              {languages.map((lang, index) => (
                <React.Fragment key={lang.code}>
                  <button
                    onClick={() => setLanguage(lang.code as any)}
                    className={`text-sm font-medium tracking-wide transition-all duration-200 hover:scale-105 font-gantari ${
                      currentLanguage === lang.code
                        ? 'text-aurelle-brown'
                        : 'text-aurelle-champagne hover:text-aurelle-light-green'
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-aurelle-brown/40">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={`absolute right-0 top-0 h-full w-80 bg-white border-l border-white/20 shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'animate-slide-in-right' : 'animate-slide-out-right'
          }`}>
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <span className="text-xl font-medium tracking-tight font-tenez">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-lg text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium tracking-wide py-2 font-gantari"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe size={16} className="text-foreground/60" />
                  <span className="text-sm text-foreground/60 font-gantari">Language</span>
                </div>
                <Select value={currentLanguage} onValueChange={(value) => setLanguage(value as any)}>
                  <SelectTrigger className="w-full bg-white border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
