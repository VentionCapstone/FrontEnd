import { CssBaseline, createTheme, PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { getDesignTokens } from './themeTokens';
import { useAppSelector } from '../hooks/redux-hooks';
import { getProfile } from '../stores/slices/authSlice';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const uiTheme = useAppSelector(getProfile)?.uiTheme || localStorage.getItem('ui_theme');
  const mode: PaletteMode = uiTheme === 'DARK' ? 'dark' : 'light';

  const updatedTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={updatedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
