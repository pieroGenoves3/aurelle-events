
import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  // Don't render if content is disabled or not loaded
  if (!content || !content.enabled) {
    return null;
  }

  return (
    <footer 
      id="contact" 
      className="relative z-30 py-16 px-4"
      style={{ backgroundColor: 'hsl(var(--aurelle-dark-green))' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="scroll-reveal">
            <h3 className="text-3xl font-light mb-6 opacity-100" style={{ color: 'hsl(var(--aurelle-champagne))'}}>
              {t.footer.leftTitle}
            </h3>
            <p className="text-lg mb-8 leading-relaxed opacity-100" style={{ color: 'hsl(var(--aurelle-champagne))'}}>
              {t.footer.leftDescription}
            </p>
            {/* <button className="neumorphic-btn">
              {content.buttonText}
            </button> */}
          </div>

          <div className="scroll-reveal">
            <h4 className="text-2xl font-light mb-6 text-aurelle-champagne opacity-100">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-aurelle-light-green opacity-100" strokeWidth={1} />
                <span className="text-aurelle-champagne opacity-100">{content.email}</span>
              </div>
              {/* <div className="flex items-center space-x-3">
                <Phone size={20} className="text-aurelle-light-green opacity-100" strokeWidth={1} />
                <span className="text-aurelle-champagne opacity-100">{content.phone}</span>
              </div> */}
              <div>
                <p style={{ color: 'hsl(var(--aurelle-champagne))'}}>
                  {content.locations}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center border-aurelle-light-green">
          <p className="opacity-100 text-aurelle-light-green">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
