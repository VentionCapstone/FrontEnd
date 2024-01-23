import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    secondary2: Palette['primary'];
    backgroundSecondary: Palette['primary'];
    backgroundFooter: Palette['primary'];
  }

  interface PaletteOptions {
    secondary2?: PaletteOptions['primary'];
    backgroundSecondary?: PaletteOptions['primary'];
    backgroundFooter?: PaletteOptions['primary'];
  }

  interface BreakpointOverrides {
    '2xl': true;
  }

  interface TypographyVariants {
    xs: React.CSSProperties;
    sm: React.CSSProperties;
    lg: React.CSSProperties;
    xl: React.CSSProperties;
    heading: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    xs?: React.CSSProperties;
    sm?: React.CSSProperties;
    lg?: React.CSSProperties;
    xl?: React.CSSProperties;
    heading?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xs: true;
    sm: true;
    lg: true;
    xl: true;
    heading: true;
  }
}
