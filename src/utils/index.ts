import toast from 'react-hot-toast';

import ErrorImage from '@src/assets/no-image.jpg';
import { DEFAULT_LANGUAGE, LANGUAGE_LIST } from '@src/constants/index';
import i18n from '@src/i18n/i18n';
import { Amenities } from '@src/types/amenity.types';
import { Coordinates, Status } from '@src/types/global.types';
import { BookingsRoute, ToastMessages } from '@src/types/i18n.types';
import { ThemeMode } from '@src/types/profile.types';
import { SuggestionsResponse } from '@src/types/yandex_map.types';

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onerror = (error) => reject(error);

    reader.onload = () => resolve(reader.result as string);
  });
};

export const phoneNumLengthRegEx = (length: number) => {
  return new RegExp(`^\\d{${length}}$`);
};

export const getPalleteMode = (mode: ThemeMode | null): ThemeMode => {
  if (mode === ThemeMode.dark) return mode;

  return ThemeMode.light;
};

export const getValueFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return null;

    try {
      return JSON.parse(serializedData) as T;
    } catch {
      return serializedData as T;
    }
  } catch (error) {
    console.error('Error retrieving value from local storage:', error);
    toast.error(`${i18n.t(ToastMessages.ErrorUtil)}`);

    return null;
  }
};

export const setValueToLocalStorage = (key: string, value: object | string): void => {
  try {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    throw new Error('Error setting data to local storage');
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    throw new Error('Error removing data from local storage');
  }
};

export const truncateReview = (text: string, maxChars: number) => {
  if (text.length > maxChars) {
    const truncatedText = text.slice(0, maxChars) + '...';
    return truncatedText;
  }

  return text;
};

export const lineClampStyle = (line: number) => {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: line,
    overflow: 'hidden',
  };
};

export const selectOnlyTrueAmenities = (amenities: Amenities) => {
  const trueAmenities = Object.entries(amenities)
    .filter(([, value]) => value === true)
    .map(([key]) => key);

  return trueAmenities;
};

export const handleErrorInImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = ErrorImage;
};

export const convertCodeToLanguage = (value: string): string => {
  return LANGUAGE_LIST.find((lang) => lang.code === value)?.name || DEFAULT_LANGUAGE.name;
};

export const parseCoord = (coord: string): Coordinates | null => {
  const splitted = coord.split(' ');
  const latitude = Number.parseFloat(splitted[1]);
  const longitude = Number.parseFloat(splitted[0]);

  if (isNaN(latitude) || isNaN(longitude)) {
    console.error('Invalid coordinates:', coord);
    return null;
  }

  return [latitude, longitude];
};

export const stringToNumberOfArray = (str: string) => {
  return str
    .split(' ')
    .reverse()
    .map((item) => Number(item)) as Coordinates;
};

export function selectGeoSearchFeaturedObjects(searchResponse: SuggestionsResponse) {
  return searchResponse?.response?.GeoObjectCollection?.featureMember ?? [];
}

export const translateTabStatus = (status: Status) => {
  const { t } = i18n;

  const tabStatusTranslation: Record<Status, string> = {
    PENDING: t(BookingsRoute.pending),
    ACTIVE: t(BookingsRoute.active),
    UPCOMING: t(BookingsRoute.upcoming),
    COMPLETED: t(BookingsRoute.completed),
  } as const;

  return tabStatusTranslation[status];
};
