
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { languages, Language, LanguageData } from '@/data/languages';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: LanguageData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = languages[currentLanguage];

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
