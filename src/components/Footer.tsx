"use client";
import React, { useState } from "react";
import { Mail } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const content = useContent<FooterContent>("footer");
  const { t } = useLanguage();
  const [popup, setPopup] = useState<"privacy" | "cookies" | "terms" | null>(
    null
  );

  if (!content || !content.enabled) {
    return null;
  }

  const contents = {
    privacy: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p>
          [COMPANY NAME], headquartered at [FULL ADDRESS], respects your
          privacy and processes personal data in accordance with the Swiss
          Federal Data Protection Act (nFADP – Neue Datenschutzgesetz, effective
          since 01/09/2023).
        </p>

        <h3 className="mt-4 font-semibold">1. Data Collected</h3>
        <p>
          We collect personal data that you voluntarily provide through our{" "}
          <strong>contact form</strong>, including: name, email, phone number with country code, subject of the message, event date, preferred contact date and the message itself.
        </p>
        <p>
          You may also contact us via email, phone, or WhatsApp. In this case,
          the data you provide will be processed in the same way.
        </p>

        <h3 className="mt-4 font-semibold">2. Use of Cookies</h3>
        <p>
          This site <strong>does not use tracking, marketing, or analytics
          cookies</strong>. Only <strong>essential technical cookies</strong> are
          used, necessary for the operation of the page and automatically set
          by the hosting provider (Netlify). These cookies do not personally
          identify visitors and are not used for marketing purposes.
        </p>

        <h3 className="mt-4 font-semibold">3. Purpose of Processing</h3>
        <ul className="list-disc ml-6">
          <li>Responding to received inquiries;</li>
          <li>Providing information about our services;</li>
          <li>
            Keeping communication records, when required by law.
          </li>
        </ul>

        <h3 className="mt-4 font-semibold">4. Legal Basis</h3>
        <p>
          The processing of your data is based on your{" "}
          <strong>consent</strong> when submitting information through the form
          or contacting us directly.
        </p>

        <h3 className="mt-4 font-semibold">5. Data Sharing</h3>
        <p>
          We do not share your personal data with third parties, except when
          required by law or competent Swiss authorities.
        </p>

        <h3 className="mt-4 font-semibold">6. Data Subject Rights</h3>
        <p>
          Under the nFADP, you have the right to access, rectify, or delete
          your data; revoke consent; and obtain information on the purpose and
          processing methods of your personal data.
        </p>

        <h3 className="mt-4 font-semibold">7. Security</h3>
        <p>
          We implement appropriate technical and organizational measures to
          protect your data from unauthorized access, loss, or misuse.
        </p>

        <h3 className="mt-4 font-semibold">8. Contact</h3>
        <p>
          📧 Email: <a href={`mailto:${content.email}`}>{content.email}</a>
          <br />
          📍 Address: {content.locations}
        </p>
      </div>
    ),

    terms: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Terms of Use</h2>
        <p>
          By using this website, you agree to the following Terms of Use. The
          website must be used only for lawful purposes and in compliance with
          Swiss law.
        </p>
        <p>
          All contents and materials displayed are the exclusive property of
          [COMPANY NAME]. We do not guarantee the absence of technical errors,
          and external links are the responsibility of their respective
          operators.
        </p>
        <p>
          These Terms are governed by Swiss law, and the competent court of
          [CITY/REGION] is chosen for resolving any disputes.
        </p>
      </div>
    ),

    cookies: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
        <p>
          This website only uses <strong>essential technical cookies</strong>,
          necessary for the operation of the page and automatically set by the
          hosting provider (Netlify). 
        </p>
        <p>
          We do not use analytics, marketing, or tracking cookies. You can
          manage cookies at any time via your browser settings.
        </p>
      </div>
    ),
  };

  return (
    <footer
      id="contact"
      className="relative z-30 py-16 px-4"
      style={{ backgroundColor: "hsl(var(--aurelle-dark-green))" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="scroll-reveal">
            <h3
              className="text-3xl font-light mb-6 opacity-100"
              style={{ color: "hsl(var(--aurelle-champagne))" }}
            >
              {t.footer.leftTitle}
            </h3>
            <p
              className="text-lg mb-8 leading-relaxed opacity-100"
              style={{ color: "hsl(var(--aurelle-champagne))" }}
            >
              {t.footer.leftDescription}
            </p>
          </div>

          <div className="scroll-reveal">
            <h4 className="text-2xl font-light mb-6 text-aurelle-champagne opacity-100">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail
                  size={20}
                  className="text-aurelle-light-green opacity-100"
                  strokeWidth={1}
                />
                <span className="text-aurelle-champagne opacity-100">
                  {content.email}
                </span>
              </div>
              <div>
                <p style={{ color: "hsl(var(--aurelle-champagne))" }}>
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
          <div className="mt-4 space-x-4">
            <button
              onClick={() => setPopup("privacy")}
              className="text-aurelle-champagne underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setPopup("cookies")}
              className="text-aurelle-champagne underline"
            >
              Cookie Policy
            </button>
            <button
              onClick={() => setPopup("terms")}
              className="text-aurelle-champagne underline"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl max-h-[80vh] overflow-y-auto p-6 rounded-lg relative shadow-xl">
            <button
              onClick={() => setPopup(null)}
              className="absolute top-2 right-3 text-gray-600 text-2xl"
            >
              ×
            </button>
            <div className="text-gray-800">{contents[popup]}</div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
