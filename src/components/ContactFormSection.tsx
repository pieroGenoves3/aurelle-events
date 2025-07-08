import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useContent } from '@/hooks/useContent';

interface ContactContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  headerTitle?: string;
}

const ContactFormSection = () => {
  const content = useContent<ContactContent>('contact');

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  const backgroundImage = content.backgroundImage;

  return (
    <section 
      id="contact" 
      className="py-24 px-4 relative"
      style={{ backgroundColor: '#EDE5D6' }}
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
          <div className="absolute inset-0 bg-cream/80" />
        </>
      )}
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-foreground">
            {content.title}
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="scroll-reveal glass-card p-8 bg-cream/80 backdrop-blur-sm border border-olive-green/20 rounded-2xl max-w-2xl mx-auto">
          <form 
            name="contact" 
            method="POST" 
            data-netlify="true"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-foreground mb-2 block">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="bg-cream/50 border-olive-green/30 focus:border-golden-brown"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-foreground mb-2 block">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="bg-cream/50 border-olive-green/30 focus:border-golden-brown"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="bg-cream/50 border-olive-green/30 focus:border-golden-brown"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-foreground mb-2 block">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="bg-cream/50 border-olive-green/30 focus:border-golden-brown"
              />
            </div>

            <div>
              <Label htmlFor="eventType" className="text-foreground mb-2 block">
                Event Type
              </Label>
              <Input
                id="eventType"
                name="eventType"
                type="text"
                placeholder="e.g., Wedding, Corporate Event, Fashion Show"
                className="bg-cream/50 border-olive-green/30 focus:border-golden-brown"
              />
            </div>

            <div>
              <Label htmlFor="eventDate" className="text-foreground mb-2 block">
                Preferred Event Date
              </Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                className="bg-cream/50 border-olive-green/30 focus:border-golden-brown"
              />
            </div>

            <div>
              <Label htmlFor="budget" className="text-foreground mb-2 block">
                Estimated Budget
              </Label>
              <Input
                id="budget"
                name="budget"
                type="text"
                placeholder="e.g., €50,000 - €100,000"
                className="bg-cream/50 border-olive-green/30 focus:border-golden-brown"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-foreground mb-2 block">
                Tell us about your vision
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Describe your event, your vision, and any specific requirements..."
                className="bg-cream/50 border-olive-green/30 focus:border-golden-brown resize-none"
              />
            </div>

            <Button 
              type="submit"
              className="w-full neumorphic-btn text-foreground font-medium py-3 px-8 transition-all duration-300"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;