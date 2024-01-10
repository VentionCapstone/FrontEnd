import { ThemeMode } from '../types/profile.types';
import toast from 'react-hot-toast';
import { MuiThemeMode } from '../types/theme.types';

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

export const getPalleteMode = (mode: ThemeMode | null): MuiThemeMode => {
  if (mode === ThemeMode.dark) return MuiThemeMode.dark;

  return MuiThemeMode.light;
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
    toast.error('Error retrieving value');

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

export const truncateReview = (text: string, maxChars: number) => {
  if (text.length > maxChars) {
    const truncatedText = text.slice(0, maxChars) + '...';
    return truncatedText;
  }

  return text;
};
