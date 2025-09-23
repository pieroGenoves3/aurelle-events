import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

interface MissionContent {
  enabled: boolean;
  title: string;
  backgroundImage?: string;
  headerTitle?: string;
  paragraphs: string[];
  quote: string;
}

const HeroSection = () => {
  const { t } = useLanguage();
  const content = useContent<HeroContent>('hero');
  const missionContent = useContent<MissionContent>('mission');
  const [currentImage, setCurrentImage] = useState(0);
  const [eventDate, setEventDate] = useState<Date>();
  const [contactDate, setContactDate] = useState<Date>();

  // Wedding photo carousel images
  const weddingPhotos = [
    "/images/wedding-carousel/wedc-1.jpg",
    "/images/wedding-carousel/wedc-2.jpg",
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % weddingPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [weddingPhotos.length]);

  // Não renderiza se não estiver habilitado no CMS
  if (!content || !content.enabled) {
    return null;
  }

  // Logo configuration with CMS values or fallbacks
  const logoConfig = {
    desktop: {
      height: content.logoHeightDesktop || 'h-100'
    },
    mobile: {
      height: content.logoHeightMobile || 'h-24'
    }
  };

  // Background image with CMS value or fallback
  const backgroundImage = content.backgroundImage || "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";

  // Logo image with CMS value or fallback
  const logoImage = content.logoImage || "/images/logo-principal-gold.png";

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ---- HANDLE SUBMIT COM TOAST E RESET ----
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    fetch("/", {
      method: "POST",
      body: data,
    })
      .then(() => {
        toast.success("Mensagem enviada com sucesso! Em breve retornaremos.");
        form.reset();
      })
      .catch(() => {
        toast.error("Erro ao enviar mensagem. Tente novamente.");
      });
  };

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden"
    >
      {/* Background Video */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-section-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col">
        {/* Top Hero Section with Blurred Background */}
        <div className="min-h-screen flex items-center justify-center text-center px-4 relative bg-aurelle-dark-green/60 backdrop-blur-sm">
          {/* Full Screen Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={logoImage}
              alt="Aurelle Events" 
              className="w-full h-full object-contain max-w-none max-h-none p-8 md:p-16 drop-shadow-2xl filter brightness-110 contrast-110"
            />
          </div>
        </div>

        {/* Mission Section */}
        {missionContent && missionContent.enabled && (
          <div
          id = "mission" 
            className="py-24 px-4 relative"
            style={{ backgroundColor: 'hsl(var(--aurelle-dark-green))' }}
          >
            {missionContent.backgroundImage && (
              <>
                <div 
                  className="absolute inset-0 bg-fixed bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${missionContent.backgroundImage})`,
                    transform: 'translateZ(0)'
                  }}
                />
                <div className="absolute inset-0" />
              </>
            )}
            <div className="max-w-6xl mx-auto relative z-10">
              {/* Mission Content */}
              <div className="max-w-4xl mx-auto text-center mb-24 scroll-reveal">
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 text-aurelle-champagne opacity-100 font-tenez">
                  {t.mission.title}
                </h2>
                <div className="space-y-8 text-lg md:text-xl leading-relaxed text-aurelle-champagne font-gantari">
                  {t.mission.description.map((paragraph, index) => (
                    <p key={index} className="opacity-100">{paragraph}</p>
                  ))}
                  <p className="text-2xl font-light text-aurelle-champagne italic opacity-100 font-tenez">
                    "{t.mission.quote}"
                  </p>
                </div>
              </div>

              {/* About Me Section */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center scroll-reveal">
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
                    <h3 className="text-4xl md:text-5xl font-tenez font-medium mb-6 text-aurelle-champagne">
                      {t.about.title}
                    </h3>
                    <div className="space-y-4 text-lg leading-relaxed font-gantari text-aurelle-champagne">
                      {t.about.description.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="pt-6">
                    <p className="text-sm font-gantari text-aurelle-champagne/70 mb-4">
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
                          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-aurelle-champagne">
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
                          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-aurelle-champagne">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <div id = "contact" className="py-16 px-4 bg-aurelle-champagne">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-6 text-foreground font-tenez">
                {t.hero.contactTitle}
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-gantari">
                {t.hero.contactSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1">
              {/* Contact Form */}
              <div className="scroll-reveal">
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  netlify-honeypot="bot-field"
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-8 border border-white/30"
                  onSubmit={handleSubmit}
                >
                  {/* Hidden fields for Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: 
                      <input name="bot-field" />
                    </label>
                  </p>

                  <h3 className="text-2xl font-light mb-6 text-foreground font-tenez">{t.hero.sendMessage}</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2 font-gantari">
                          {t.hero.nameField}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60"
                          placeholder={t.hero.namePlaceholder}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2 font-gantari">
                          {t.hero.emailField}
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60"
                          placeholder={t.hero.emailPlaceholder}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="countryCode" className="block text-sm font-medium text-foreground/80 mb-2 font-gantari">
                          {t.hero.countryCodeField}
                        </label>
                        <Input
                          id="countryCode"
                          name="countryCode"
                          type="text"
                          placeholder={t.hero.countryCodePlaceholder}
                          className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground/80 mb-2 font-gantari">
                          {t.hero.phoneNumberField}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          pattern="[0-9]*"
                          placeholder={t.hero.phoneNumberPlaceholder}
                          className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60"
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.value = target.value.replace(/[^0-9]/g, '');
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2 font-gantari">
                        {t.hero.subjectField}
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60"
                        placeholder={t.hero.subjectPlaceholder}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2 font-gantari">
                          {t.hero.eventDateField}
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal bg-white/30 border-white/40 text-foreground hover:bg-white/40",
                                !eventDate && "text-foreground/50"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {eventDate ? format(eventDate, "PPP") : <span>{t.hero.eventDatePlaceholder}</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={eventDate}
                              onSelect={setEventDate}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <input type="hidden" name="eventDate" value={eventDate ? format(eventDate, "yyyy-MM-dd") : ""} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2 font-gantari">
                          {t.hero.preferedContactDateField}
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal bg-white/30 border-white/40 text-foreground hover:bg-white/40",
                                !contactDate && "text-foreground/50"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {contactDate ? format(contactDate, "PPP") : <span>{t.hero.preferedContactDatePlaceholder}</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={contactDate}
                              onSelect={setContactDate}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <input type="hidden" name="contactDate" value={contactDate ? format(contactDate, "yyyy-MM-dd") : ""} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2 font-gantari">
                        {t.hero.messageField}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60 resize-none"
                        placeholder={t.hero.messagePlaceholder}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-aurelle-dark-green text-aurelle-champagne hover:bg-aurelle-light-green hover:text-aurelle-champagne font-medium transition-all duration-200 font-gantari"
                    >
                      <Send size={16} className="mr-2" />
                      {t.hero.sendButton}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
