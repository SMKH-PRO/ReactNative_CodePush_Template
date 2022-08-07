import type { Arabic, English, LanguageCodes } from '../types';

type SupportedLanguages = {
  [K in LanguageCodes]: {
    name: string;
    rtl: boolean;
  };
};

const english: English = 'en';
const arabic: Arabic = 'ar';

const supportedLanguages: SupportedLanguages = {
  [english]: {
    name: 'English',
    rtl: false,
  },
};

export { supportedLanguages, english, arabic };
