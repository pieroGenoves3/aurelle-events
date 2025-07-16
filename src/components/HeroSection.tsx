
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Don't render if content is disabled or not loaded
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[200vh] overflow-hidden"
      style={{ 
        // background: 'linear-gradient(135deg, #ffffff 0%, #EDE5D6 30%, #ffffff 70%, #EDE5D6 100%)'
        background: 'hsl(var(--aurelle-dark-green))'
      }}
    >
      {/* Background Image */}
      {/* <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-cream/30 to-white/40 z-10" />
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div> */}

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col">
        {/* Top Hero Section */}
        <div className="min-h-screen flex items-center justify-center text-center px-4">
          <div className="max-w-7xl animate-fade-in-up">
            {/* Logo */}
            <div className={content.imagePadding}>
              <img 
                src={logoImage}
                alt="Aurelle Events" 
                className={`${logoConfig.desktop.height} md:${logoConfig.desktop.height} md:${logoConfig.mobile.height} w-auto object-contain mx-auto drop-shadow-2xl filter brightness-110 contrast-110`}
              />
            </div>
            {/* <p className="text-xl md:text-2xl text-foreground font-light max-w-2xl mx-auto leading-relaxed drop-shadow-2xl mb-8 filter brightness-110 opacity-100">
              {content.subtitle}
            </p>
            <button
              onClick={scrollToContact}
              className="hero-neumorphic-btn text-lg shadow-2xl opacity-100"
            >
              {content.cta}
            </button> */}
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
                  <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-aurelle-champagne opacity-100">
                    {missionContent.title}
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl leading-relaxed">
                    {missionContent.paragraphs.map((paragraph, index) => (
                      <p key={index} className="opacity-100 text-aurelle-champagne/80">{paragraph}</p>
                    ))}
                    <p className="text-2xl font-light text-aurelle-brown/50 italic opacity-100">
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
        <div id="contact-form" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 text-foreground">
                Get in Touch
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                Ready to start your journey? Contact us today and let's discuss how we can help you achieve your goals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8 scroll-reveal">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 border border-white/30">
                  <h3 className="text-2xl font-light mb-6 text-foreground">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Mail size={20} className="text-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground/80 text-sm">Email</p>
                        <p className="text-foreground font-medium">contact@aurelle.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Phone size={20} className="text-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground/80 text-sm">Phone</p>
                        <p className="text-foreground font-medium">+55 (11) 9999-9999</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <MapPin size={20} className="text-foreground" />
                      </div>
                      <div>
                        <p className="text-foreground/80 text-sm">Address</p>
                        <p className="text-foreground font-medium">R. Carlos de Campos, 198<br />Vila Boa Vista, Barueri - SP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="scroll-reveal">
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-8 border border-white/30"
                >
                  {/* Hidden fields for Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don't fill this out if you're human: 
                      <input name="bot-field" />
                    </label>
                  </p>

                  <h3 className="text-2xl font-light mb-6 text-foreground">Send us a message</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="bg-white/30 border-white/40 text-foreground placeholder:text-foreground/50 focus:border-white/60 resize-none"
                        placeholder="Tell us more about your project or inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-foreground text-background hover:bg-foreground/90 py-3 font-medium transition-all duration-200 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Send Message
                        </>
                      )}
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
