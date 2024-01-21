import { LanguageList, PhoneCodesByCountry } from './constants.types';

export const PHONE_CODES_BY_COUNTRY: PhoneCodesByCountry[] = [
  { name: 'Uzbekistan', code: 998, numLength: 9 },
  { name: 'Russia', code: 7, numLength: 11 },
  { name: 'Kazakhstan', code: 7, numLength: 10 },
];

export const DEFAULT_COUNTRY = PHONE_CODES_BY_COUNTRY[0];

export const LANGUAGE_LIST: LanguageList[] = [
  { name: 'English', code: 'en' },
  { name: 'Русский', code: 'ru' },
  { name: "O'zbekcha", code: 'uz' },
  { name: 'Қазақша', code: 'kz' },
  { name: 'Deutsche', code: 'de' },
];

export const DEFAULT_LANGUAGE = LANGUAGE_LIST[0];
