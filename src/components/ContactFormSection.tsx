import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const NetlifyHiddenForm = () => (
  <form name="contact" method="POST" data-netlify="true" hidden>
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="text" name="subject" />
    <textarea name="message"></textarea>
  </form>
);

const ContactFormSection = () => {
  const { t } = useLanguage();

  
  return (
    <>
    <NetlifyHiddenForm/>
    <section 
      id="contact" 
      className="py-24 px-4 relative"
      style={{ backgroundColor: 'hsl(var(--aurelle-light-green))' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-aurelle-champagne">
            {t.contact.title}
          </h2>
          <p className="text-xl text-aurelle-champagne/80 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 scroll-reveal">
            <div className="bg-aurelle-champagne/10 backdrop-blur-sm rounded-lg p-8 border border-aurelle-champagne/20">
              <h3 className="text-2xl font-light mb-6 text-aurelle-champagne">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-aurelle-champagne/20 flex items-center justify-center">
                    <Mail size={20} className="text-aurelle-champagne" />
                  </div>
                  <div>
                    <p className="text-aurelle-champagne/80 text-sm">Email</p>
                    <p className="text-aurelle-champagne font-medium">contact@aurelle.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-aurelle-champagne/20 flex items-center justify-center">
                    <Phone size={20} className="text-aurelle-champagne" />
                  </div>
                  <div>
                    <p className="text-aurelle-champagne/80 text-sm">Phone</p>
                    <p className="text-aurelle-champagne font-medium">+55 (11) 9999-9999</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-aurelle-champagne/20 flex items-center justify-center">
                    <MapPin size={20} className="text-aurelle-champagne" />
                  </div>
                  <div>
                    <p className="text-aurelle-champagne/80 text-sm">Address</p>
                    <p className="text-aurelle-champagne font-medium">R. Carlos de Campos, 198<br />Vila Boa Vista, Barueri - SP</p>
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
              className="bg-aurelle-champagne/10 backdrop-blur-sm rounded-lg p-8 border border-aurelle-champagne/20"
            >
              
<input type="hidden" name="form-name" value="contact" />

              <h3 className="text-2xl font-light mb-6 text-aurelle-champagne">Send us a message</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-aurelle-champagne/80 mb-2">
                      {t.contact.name} *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="bg-aurelle-champagne/20 border-aurelle-champagne/30 text-aurelle-champagne placeholder:text-aurelle-champagne/50 focus:border-aurelle-champagne"
                      placeholder={t.contact.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-aurelle-champagne/80 mb-2">
                      {t.contact.email} *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-aurelle-champagne/20 border-aurelle-champagne/30 text-aurelle-champagne placeholder:text-aurelle-champagne/50 focus:border-aurelle-champagne"
                      placeholder={t.contact.email}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-aurelle-champagne/80 mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="bg-aurelle-champagne/20 border-aurelle-champagne/30 text-aurelle-champagne placeholder:text-aurelle-champagne/50 focus:border-aurelle-champagne"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-aurelle-champagne/80 mb-2">
                    {t.contact.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="bg-aurelle-champagne/20 border-aurelle-champagne/30 text-aurelle-champagne placeholder:text-aurelle-champagne/50 focus:border-aurelle-champagne resize-none"
                    placeholder={t.contact.message}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-aurelle-champagne text-aurelle-light-green hover:bg-aurelle-champagne/90 py-3 font-medium transition-all duration-200 flex items-center justify-center"
                >
                  <Send size={16} className="mr-2" />
                  {t.contact.send}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactFormSection;