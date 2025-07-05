
import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import MottosSection from '@/components/MottosSection';
import MissionSection from '@/components/MissionSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

const Index = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach((el) => observer.observe(el));

    // Page entrance animation
    if (pageRef.current) {
      pageRef.current.style.opacity = '0';
      setTimeout(() => {
        if (pageRef.current) {
          pageRef.current.style.transition = 'opacity 0.8s ease-out';
          pageRef.current.style.opacity = '1';
        }
      }, 100);
    }

    return () => {
      scrollRevealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <LanguageProvider>
      <div 
        ref={pageRef} 
        className="min-h-screen luxury-gradient"
        style={{ 
          backgroundColor: '#ffffff',
          background: '#ffffff'
        }}
      >
        <Navigation />
        <HeroSection />
        <MottosSection />
        <MissionSection />
        <FAQSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
