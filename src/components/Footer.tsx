
import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer 
      id="contact" 
      className="py-16 px-4"
      style={{ backgroundColor: 'rgb(255, 255, 255)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="scroll-reveal">
            <h3 className="text-3xl font-light tracking-tighter mb-6">
              Ready to Create Something Extraordinary?
            </h3>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Let's discuss your vision and bring it to life with unparalleled elegance and sophistication.
            </p>
            <button className="neumorphic-btn">
              Start Your Journey
            </button>
          </div>

          <div className="scroll-reveal">
            <h4 className="text-2xl font-light tracking-tight mb-6">
              Contact Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-primary" strokeWidth={1} />
                <span className="text-foreground/70">hello@aurelleevents.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-primary" strokeWidth={1} />
                <span className="text-foreground/70">+33 1 42 86 87 88</span>
              </div>
              <div className="text-foreground/70">
                <p>Paris • Milan • Monaco • London</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-foreground/70">
            © 2024 Aurelle Events. All rights reserved. Crafted with passion for extraordinary experiences.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
