import { PaletteMode, ThemeOptions } from '@mui/material';

export const PRIMARY_LIGHT_THEME = '#222222';
export const PRIMARY_DARK_THEME = '#ffffff';

const lightTheme: ThemeOptions = {
  spacing: 4,
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY_LIGHT_THEME,
    },
    secondary: {
      main: '#FF385C',
    },
    secondary2: {
      light: '#DDDDDD',
      main: '#717171',
    },
  },
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
          color: PRIMARY_LIGHT_THEME,
          fontFamily: 'Nunito, sans-serif',
        },
      },
      defaultProps: {
        variantMapping: {
          xs: 'p',
          sm: 'p',
          lg: 'p',
          xl: 'p',
        },
      },
    },
  },
} as const;

const darkTheme: ThemeOptions = {
  spacing: 4,
  palette: {
    mode: 'dark',
    primary: {
      main: PRIMARY_DARK_THEME,
    },
    secondary: {
      main: '#FF385C',
    },
    secondary2: {
      light: '#DDDDDD',
      main: '#717171',
    },
  },
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
          color: PRIMARY_DARK_THEME,
          fontFamily: 'Nunito, sans-serif',
        },
      },
      defaultProps: {
        variantMapping: {
          xs: 'p',
          sm: 'p',
          lg: 'p',
          xl: 'p',
        },
      },
    },
  },
} as const;

export const themeOptions: Record<PaletteMode, ThemeOptions> = {
  light: lightTheme,
  dark: darkTheme,
};
