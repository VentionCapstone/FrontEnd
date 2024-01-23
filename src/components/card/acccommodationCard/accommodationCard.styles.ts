import { MuiStylesObject } from '@src/types/utility.types';

export const accommodationCardStyles = {
  root: {
    flex: {
      xs: '1 1 100%',
      sm: '1 1 48.5%',
      md: '0 1 31.5%',
      lg: '0 1 23.5%',
    },
    cursor: 'pointer',
    a: {
      textDecoration: 'none',
    },
  },
  imageBox: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 3,
  },
  favoriteIcon: { position: 'absolute', top: 3, right: 3 },
} satisfies MuiStylesObject;
