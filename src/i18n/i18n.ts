import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import deTranslations from '../locale/de/error.json';
import enTranslations from '../locale/en/error.json';
import kzTranslations from '../locale/kz/error.json';
import ruTranslations from '../locale/ru/error.json';
import uzTranslations from '../locale/uz/error.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: deTranslations,
      en: enTranslations,
      kz: kzTranslations,
      ru: ruTranslations,
      uz: uzTranslations,
    },
    lng: 'en',
    fallbackLng: 'en',
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error);
  });

export default i18n;
