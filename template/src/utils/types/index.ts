type English = 'en';

type Arabic = 'ar';
type LanguageCodes = English; // | Arabic;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string | number, any>;
type Key = number;

export type { LanguageCodes, English, Arabic, AnyObject, Key };
