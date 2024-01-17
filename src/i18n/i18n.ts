import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { DEFAULT_LANGUAGE } from '@src/constants';
import deTranslations from '../locale/de/translations.json';
import enTranslations from '../locale/en/translations.json';
import kzTranslations from '../locale/kz/translations.json';
import ruTranslations from '../locale/ru/translations.json';
import uzTranslations from '../locale/uz/translations.json';

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
    lng:
      localStorage.getItem(LOCAL_STORAGE_KEYS.language) || navigator.language || DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error);
  });

export default i18n;
