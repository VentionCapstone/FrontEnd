// utils folder is for utility functions that can be used anywhere in the app

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

    return value as T;
  } catch (error) {
    console.error('Error retrieving value from local storage:', error);

    return null;
  }
};
