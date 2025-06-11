
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');

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

  const navigationItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Events', id: 'events' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'About', id: 'mottos' },
    { name: 'Mission', id: 'mission' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' }
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-medium tracking-tight text-foreground">
              Aurelle Events
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground/80 hover:text-foreground transition-all duration-200 font-medium tracking-wide hover:scale-105"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-foreground/60" />
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32 h-8 text-sm border-none bg-transparent text-foreground/80 hover:text-foreground">
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

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={`absolute right-0 top-0 h-full w-80 bg-white/90 backdrop-blur-lg border-l border-white/20 shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'animate-slide-in-right' : 'animate-slide-out-right'
          }`}>
            <div className="flex justify-between items-center p-6 border-b border-white/20">
              <span className="text-xl font-medium tracking-tight">Menu</span>
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
                  className="text-left text-lg text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium tracking-wide py-2"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe size={16} className="text-foreground/60" />
                  <span className="text-sm text-foreground/60">Language</span>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
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
