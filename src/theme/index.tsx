import { CssBaseline, createTheme, PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '../hooks/redux-hooks';
import { getProfile } from '../stores/slices/authSlice';
import { getPalleteMode, getValueFromLocalStorage } from '../utils';
import { LOCAL_STORAGE_KEYS } from '../config/local-storage.config';
import { ThemeMode } from '../types/profile.types';
import { themeOptions } from './themeTokens';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const uiTheme =
    useAppSelector(getProfile)?.uiTheme ||
    getValueFromLocalStorage<ThemeMode>(LOCAL_STORAGE_KEYS.uiTheme);

  const mode: PaletteMode = getPalleteMode(uiTheme);
  const theme = createTheme(themeOptions[mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
