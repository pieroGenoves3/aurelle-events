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
        <h2 className="text-2xl font-semibold mb-4">{t.privacyPolicy.title}</h2>
        <p>
          {t.privacyPolicy.introduction}
        </p>

        <h3 className="mt-4 font-semibold">{t.privacyPolicy.firstItem}</h3>
        <p>
          {t.privacyPolicy.firstDescription}
        </p>

        <h3 className="mt-4 font-semibold">{t.privacyPolicy.secondItem}</h3>
        <p>
          {t.privacyPolicy.secondDescription}
        </p>

        <h3 className="mt-4 font-semibold">{t.privacyPolicy.thirdItem}</h3>
        <p>{t.privacyPolicy.thirdDescription}</p>
        {/* <ul className="list-disc ml-6">
          <li>Responding to received inquiries;</li>
          <li>Providing information about our services;</li>
          <li>
            Keeping communication records, when required by law.
          </li>
        </ul> */}

        <h3 className="mt-4 font-semibold">{t.privacyPolicy.fourthItem}</h3>
        <p>
          {t.privacyPolicy.fourthDescription}
        </p>

        <h3 className="mt-4 font-semibold">{t.privacyPolicy.fifthItem}</h3>
        <p>
          {t.privacyPolicy.fifthDescription}
        </p>

        <h3 className="mt-4 font-semibold">{t.privacyPolicy.sixthItem}</h3>
        <p>
          {t.privacyPolicy.sixthDescription}
        </p>

        <h3 className="mt-4 font-semibold">{t.privacyPolicy.seventhItem}</h3>
        <p>
          {t.privacyPolicy.seventhDescription}
        </p>

        <h3 className="mt-4 font-semibold">{t.privacyPolicy.eighthItem}</h3>
        <p>
          📧 Email: <a href={`mailto:${content.email}`}>{content.email}</a>
          <br />
          📍 Address: {t.privacyPolicy.eighthDescription}
        </p>
      </div>
    ),

    terms: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">{t.termsOfUse.title}</h2>
        <p>
          {t.termsOfUse.description}
        </p>
      </div>
    ),

    cookies: (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
        <p>
          {t.cookiePolicy.description}
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
            {t.copyRight.description}
          </p>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => setPopup("privacy")}
              className="text-aurelle-champagne underline"
            >
{t.privacyPolicy.title}
            </button>
            <button
              onClick={() => setPopup("cookies")}
              className="text-aurelle-champagne underline"
            >
              {t.cookiePolicy.title}
            </button>
            <button
              onClick={() => setPopup("terms")}
              className="text-aurelle-champagne underline"
            >
              {t.termsOfUse.title}
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
