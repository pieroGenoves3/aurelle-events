
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
      className="minimal-section bg-gray-900 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="minimal-reveal">
            <h3 className="text-3xl font-light tracking-tight mb-6 text-white">
              {content.title}
            </h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {content.description}
            </p>
            <button className="luxury-minimal-button bg-white text-gray-900 border-white hover:bg-gray-100">
              {content.buttonText}
            </button>
          </div>

          <div className="minimal-reveal">
            <h4 className="text-2xl font-light tracking-tight mb-6 text-white">
              {content.contactTitle}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400" strokeWidth={1} />
                <span className="text-gray-300">{content.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-400" strokeWidth={1} />
                <span className="text-gray-300">{content.phone}</span>
              </div>
              <div className="text-gray-300">
                <p>{content.locations}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
