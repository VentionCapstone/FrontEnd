import { LanguageCollection, PhoneCodesByCountry } from './constant.types';

export const DATE_FORMAT = 'MM-DD-YYYY';

export const STALE_TIME = 60 * 5 * 1000;

export const DATE_FORMAT_MONTH_FIRST = 'YYYY-MM-DD';

export const DATE_MONTH_DAY = 'MMM DD';

export const MAX_UPLOAD_FILE_NUMBER = 20;

export const MINUMUM_UPLOAD_FILE_NUMBER = 5;

export const ACCEPT_UPLOAD_FILE_TYPE = ['jpg', 'gif', 'png'];

export const DATE_MONTH_YEAR_FORMAT = 'MMMM YYYY';

export const DEFAULT_MALE_IMAGE =
  'https://i.pinimg.com/564x/48/6c/a0/486ca00640b169300b48e9ceacd8e401.jpg';

export const DEFAULT_FEMALE_IMAGE =
  'https://i.pinimg.com/564x/39/42/01/39420149269ede36847932935b26f0b8.jpg';

export const PHONE_CODES_BY_COUNTRY: PhoneCodesByCountry[] = [
  { name: 'Uzbekistan', code: 998, numLength: 9 },
  { name: 'Russia', code: 7, numLength: 11 },
  { name: 'Kazakhstan', code: 7, numLength: 10 },
];

export const DEFAULT_COUNTRY = PHONE_CODES_BY_COUNTRY[0];

export const LANGUAGE_LIST: LanguageCollection[] = [
  { name: 'English', code: 'en' },
  { name: 'Русский', code: 'ru' },
  { name: "O'zbekcha", code: 'uz' },
  { name: 'Қазақша', code: 'kz' },
  { name: 'Deutsche', code: 'de' },
];

export const DEFAULT_LANGUAGE = LANGUAGE_LIST[0];
