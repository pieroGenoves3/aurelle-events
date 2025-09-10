import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContent } from '@/hooks/useContent';
import { toast } from 'sonner'; // <== importação do sonner

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
      {/* Background Static Image */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden z-0">
        <img
          src="/images/hero-section-main.jpeg"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col">
        {/* Top Hero Section with Blurred Background */}
        <div className="min-h-screen flex items-center justify-center text-center px-4 relative bg-aurelle-dark-green/60">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Mission Text */}
                <div className="space-y-8 scroll-reveal">
                  <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-aurelle-champagne opacity-100 font-tenez">
                    {missionContent.title}
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl leading-relaxed font-gantari">
                    {missionContent.paragraphs.map((paragraph, index) => (
                      <p key={index} className="opacity-100 text-aurelle-champagne/80">{paragraph}</p>
                    ))}
                    <p className="text-2xl font-light text-aurelle-brown/50 italic opacity-100 font-tenez">
                      "{missionContent.quote}"
                    </p>
                  </div>
                </div>
                
                {/* Mission Image */}
                <div className="scroll-reveal">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                      alt="Our Mission"
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <div id="contact-form" className="py-16 px-4 bg-aurelle-champagne">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 text-foreground font-tenez">
                {t.hero.contactTitle}
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-gantari">
                {t.hero.contactSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1">
              {/* Contact Information */}
              {/* <div className="space-y-8 scroll-reveal">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 border border-white/30">
                  <h3 className="text-2xl font-light mb-6 text-foreground font-tenez">{t.hero.contactInfo}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Mail size={20} className="text-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground/80 text-sm font-gantari">Email</p>
                        <p className="text-foreground font-medium font-gantari">contact@aurelle.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Phone size={20} className="text-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground/80 text-sm font-gantari">Phone</p>
                        <p className="text-foreground font-medium font-gantari">+55 (11) 9999-9999</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <MapPin size={20} className="text-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground/80 text-sm font-gantari">Address</p>
                        <p className="text-foreground font-medium font-gantari">R. Carlos de Campos, 198<br />Vila Boa Vista, Barueri - SP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

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
                          {t.hero.nameRequired}
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
                          {t.hero.emailRequired}
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

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2 font-gantari">
                        {t.hero.messageRequired}
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
                      className="w-full bg-foreground text-background hover:bg-foreground/90 py-3 font-medium transition-all duration-200 font-gantari"
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
