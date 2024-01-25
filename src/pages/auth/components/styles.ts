import { MuiStylesObject } from '@src/types/utility.types';

export const confirmEmailSyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '70vh',
  },
  box: {
    width: {
      xs: '100%',
      sm: '80%',
      md: '70%',
      lg: '60%',
      xl: '55%',
    },
    mx: 'auto',
    height: '400px',
    mt: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    'bgcolor': 'success.light',
    'mb': 5,
    ':hover': {
      bgcolor: 'success.main',
    },
  },
  icon: {
    color: 'white',
    fontSize: {
      xs: '2rem',
      md: '3rem',
      lg: '4rem',
    },
  },
  description: {
    width: {
      xs: '80%',
      md: '70%',
      lg: '60%',
    },
  },
  link: {
    fontSize: {
      xs: '0.8rem',
      md: '1rem',
    },
    mt: 5,
  },
} satisfies MuiStylesObject;
