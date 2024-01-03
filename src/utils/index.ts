import { PaletteMode } from '@mui/material';
import { ThemeMode } from '../types/profile.types';
import { Amenity } from '../types/accommodation.types';
import ErrorImage from '../assets/no-image.png';

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

export const getValueFromLocalStorage = <T>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key);

    if (value !== null) {
      return JSON.parse(value) as T;
    }

    return null;
  } catch (error) {
    console.error('Error retrieving value from local storage:', error);

    return null;
  }
};

export const getPalleteMode = (mode: ThemeMode | null): PaletteMode => {
  if (mode === ThemeMode.dark) return 'dark';

  return 'light';
};

export const selectOnlyTrueAmenities = (amenities: Amenity) => {
  const trueAmenities = Object.entries(amenities)
    .filter(([, value]) => value === true)
    .map(([key]) => key);

  return trueAmenities;
};

export const handleErrorInImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = ErrorImage;
  e.currentTarget.style.objectFit = 'contain';
};
