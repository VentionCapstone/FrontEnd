import { MuiStylesObject } from '@src/types/utility.types';

export const styles = {
  heading: {
    fontWeight: 'bold',
    fontSize: {
      xs: '1rem',
      md: '1.3rem',
      lg: '1.5rem',
    },
    marginBottom: '1rem',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
    flexDirection: {
      xs: 'column',
      lg: 'row',
    },
    mt: 7,
  },
  content_price: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  button: {
    'backgroundColor': 'primary.main',
    'fontWeight': 'bold',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
} satisfies MuiStylesObject;
