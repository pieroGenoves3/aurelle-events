
import React, { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import EventsSection from '@/components/EventsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MottosSection from '@/components/MottosSection';
import MissionSection from '@/components/MissionSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

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
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-background via-amber-50/20 to-amber-100/30">
      <Navigation />
      <HeroSection />
      <EventsSection />
      <TestimonialsSection />
      <MottosSection />
      <MissionSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
