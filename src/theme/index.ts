import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    darkGrey: Palette['primary'];
  }

  interface PaletteOptions {
    darkGrey?: PaletteOptions['primary'];
  }

  interface BreakpointOverrides {
    '2xl': true;
  }

  interface TypographyVariants {
    xs: React.CSSProperties;
    sm: React.CSSProperties;
    lg: React.CSSProperties;
    xl: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    xs?: React.CSSProperties;
    sm?: React.CSSProperties;
    lg?: React.CSSProperties;
    xl?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xs: true;
    sm: true;
    lg: true;
    xl: true;
  }
}

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
      main: '#222222',
    },
    secondary: {
      main: '#FF385C',
    },
    darkGrey: {
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
          color: '#222222',
          fontFamily: 'Nunito, sans-serif',
        },
      },
    },
  },
});
