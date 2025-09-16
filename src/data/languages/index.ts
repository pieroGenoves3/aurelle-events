
import { en } from './en';
import { de } from './de';
import { pt } from './pt';

export const languages = {
  en,
  de,
  pt
};

export type Language = keyof typeof languages;
export type LanguageData = typeof en;
