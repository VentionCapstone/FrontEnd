import { MuiStylesObject } from '@src/types/utility.types';

export const accommodationCardStyles = {
  root: {
    flex: {
      xs: '1 1 100%',
      sm: '1 1 48.5%',
      md: '0 1 31.8%',
      lg: '0 1 23.7%',
      xl: '0 1 24%',
    },
    cursor: 'pointer',
    a: {
      textDecoration: 'none',
    },
    display: 'flex',
    flexDirection: 'column',
  },

  imageBox: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 3,
    mb: 4,
  },

  singleLine: {
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
    overflowWrap: 'break-word',
  },

  favoriteIcon: { position: 'absolute', top: 3, right: 3 },
} satisfies MuiStylesObject;
