
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useContent } from '@/hooks/useContent';

const FAQSection = () => {
  const { content, loading } = useContent('faq');

  // Don't render if content is disabled or loading
  if (loading || !content?.enabled) {
    return null;
  }

  return (
    <section 
      id="faq" 
      className="py-24 px-4"
      style={{ backgroundColor: '#EDE5D6' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
            {content.title || "Frequently Asked Questions"}
          </h2>
          <p className="text-xl text-foreground/80">
            {content.subtitle || "Everything you need to know about working with us"}
          </p>
        </div>

        <div className="scroll-reveal glass-card p-8 bg-cream/80 backdrop-blur-sm border border-olive-green/20">
          <Accordion type="single" collapsible className="space-y-4">
            {content.faqs?.map((faq: any, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-light tracking-tight hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pt-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
