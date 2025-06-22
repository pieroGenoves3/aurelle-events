
import { en } from './en';
import { it } from './it';
import { de } from './de';
import { pt } from './pt';

export const languages = {
  en,
  it, 
  de,
  pt
};

export type Language = keyof typeof languages;
export type LanguageData = typeof en;
