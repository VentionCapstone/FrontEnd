import { PaletteMode } from '@mui/material';

const PRIMARY_LIGHT_THEME = '#222222';
const PRIMARY_DARK_THEME = '#ffffff';

export const themeTokens = {
  spacing: 4,
  palette: {
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
};

export const getDesignTokens = (mode: PaletteMode) => ({
  ...themeTokens,
  palette: {
    ...(mode === 'light'
      ? themeTokens.palette
      : {
          ...themeTokens.palette,
          primary: {
            main: PRIMARY_DARK_THEME,
          },
        }),
    mode,
  },
  components: {
    ...(mode === 'light'
      ? themeTokens.components
      : {
          ...themeTokens.components,
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
        }),
  },
});
