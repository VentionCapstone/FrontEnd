import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { getTheme } from '@src/stores/slices/authSlice';
import { ThemeMode } from '@src/types/profile.types';
import { getPalleteMode, getValueFromLocalStorage, setValueToLocalStorage } from '@src/utils';
import { themeOptions } from './themeTokens';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const profileThemeMode = useAppSelector(getTheme);
  const localThemeMode = getValueFromLocalStorage<ThemeMode>(LOCAL_STORAGE_KEYS.uiTheme);
  const [mode, setMode] = useState<ThemeMode>(localThemeMode ?? ThemeMode.light);
  const theme = createTheme(themeOptions[getPalleteMode(mode)]);

  useEffect(() => {
    if (profileThemeMode && profileThemeMode !== localThemeMode) {
      try {
        setMode(profileThemeMode);
        setValueToLocalStorage(LOCAL_STORAGE_KEYS.uiTheme, profileThemeMode);
      } catch (error) {
        console.error(error);
        toast.error('Error changing theme!');
      }
    }
  }, [profileThemeMode, localThemeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
