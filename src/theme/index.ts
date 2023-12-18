import { createTheme } from '@mui/material/styles';

const COLOR_PRIMARY = '#222222';

export const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: 'Nunito, sans-serif',
    xs: {
      fontSize: '0.75rem',
      lineHeight: '1rem',
    },
    sm: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    lg: {
      fontSize: '1.375rem',
      lineHeight: '1.75rem',
    },
    xl: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
    },
  },
  palette: {
    primary: {
      main: COLOR_PRIMARY,
    },
    secondary: {
      main: '#FF385C',
    },
    secondary2: {
      light: '#DDDDDD',
      main: '#717171',
    },
  },
  breakpoints: {
    values: {
      'xs': 0,
      'sm': 480,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: COLOR_PRIMARY,
          fontFamily: 'Nunito, sans-serif',
        },
      },
    },
  },
});
