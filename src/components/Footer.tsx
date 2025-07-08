
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useContent } from '@/hooks/useContent';

interface FooterContent {
  enabled: boolean;
  title: string;
  description: string;
  buttonText: string;
  contactTitle: string;
  email: string;
  phone: string;
  locations: string;
  copyright: string;
}

const Footer = () => {
  const content = useContent<FooterContent>('footer');

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  return (
    <footer 
      id="contact" 
      className="py-16 px-4"
      style={{ backgroundColor: '#383D33' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="scroll-reveal">
            <h3 className="text-3xl font-light tracking-tighter mb-6 text-cream">
              {content.title}
            </h3>
            <p className="text-lg text-cream/80 mb-8 leading-relaxed">
              {content.description}
            </p>
            <button className="neumorphic-btn">
              {content.buttonText}
            </button>
          </div>

          <div className="scroll-reveal">
            <h4 className="text-2xl font-light tracking-tight mb-6 text-cream">
              {content.contactTitle}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-golden-brown" strokeWidth={1} />
                <span className="text-cream/70">{content.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-golden-brown" strokeWidth={1} />
                <span className="text-cream/70">{content.phone}</span>
              </div>
              <div className="text-cream/70">
                <p>{content.locations}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-olive-green/20 pt-8 text-center">
          <p className="text-cream/70">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
