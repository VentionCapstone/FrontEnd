export type PhoneCodesByCountry = {
  name: string;
  code: number;
  numLength: number;
};

export type LanguageCollection = {
  name: string;
  code: 'en' | 'ru' | 'uz' | 'kz' | 'de';
};
