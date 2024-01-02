import { CssBaseline, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '../hooks/redux-hooks';
import { getTheme } from '../stores/slices/authSlice';
import { getPalleteMode, getValueFromLocalStorage, setValueToLocalStorage } from '../utils';
import { LOCAL_STORAGE_KEYS } from '../config/local-storage.config';
import { ThemeMode } from '../types/profile.types';
import { themeOptions } from './themeTokens';
import { useEffect, useState } from 'react';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const profileThemeMode = useAppSelector(getTheme);
  const localThemeMode = getValueFromLocalStorage<ThemeMode>(LOCAL_STORAGE_KEYS.uiTheme);
  const [mode, setMode] = useState<ThemeMode>(localThemeMode ?? ThemeMode.light);
  const theme = createTheme(themeOptions[getPalleteMode(mode)]);

  useEffect(() => {
    if (profileThemeMode && profileThemeMode !== localThemeMode) {
      setMode(profileThemeMode);
      setValueToLocalStorage(LOCAL_STORAGE_KEYS.uiTheme, profileThemeMode);
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
