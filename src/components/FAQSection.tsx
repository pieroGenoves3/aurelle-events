
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What types of events do you specialize in?",
      answer: "We specialize in luxury weddings, corporate events, fashion shows, galas, product launches, and private celebrations. Our expertise spans intimate gatherings to grand events with thousands of guests."
    },
    {
      question: "How far in advance should I book your services?",
      answer: "For luxury weddings and large-scale events, we recommend booking 12-18 months in advance. Corporate events and smaller celebrations can typically be planned 3-6 months ahead."
    },
    {
      question: "Do you provide services internationally?",
      answer: "Yes, we provide full-service event planning throughout Europe and select international destinations. Our network of trusted partners ensures seamless execution anywhere in the world."
    },
    {
      question: "What is included in your event planning services?",
      answer: "Our comprehensive services include venue selection, design and décor, catering coordination, entertainment booking, logistics management, vendor coordination, and day-of event management."
    },
    {
      question: "How do you ensure the privacy of high-profile clients?",
      answer: "Discretion and confidentiality are paramount to our service. All team members sign comprehensive NDAs, and we implement strict security protocols for every event we manage."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-foreground/80">
            Everything you need to know about working with us
          </p>
        </div>

        <div className="scroll-reveal glass-card p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
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
