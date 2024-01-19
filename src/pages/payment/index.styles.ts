import { MuiStylesObject } from '@src/types/utility.types';

export const styles = {
  payment_container: {
    flexDirection: { xs: 'column', lg: 'row' },
    width: { xs: '100%', sm: '90%', lg: '87%', xl: '80%' },
    gap: 6,
    marginX: 'auto',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: { xs: 'center', md: 'space-between' },
  },
  payment_form: {
    flex: '0.5',
    width: {
      xs: '100%',
      md: '70%',
      lg: '100%',
    },
    border: '1px solid',
    borderColor: 'secondary2.light',
    borderRadius: '1rem',
    padding: '1rem',
  },
  payment_accommodation_container: {
    flex: '0.5',
    border: '1px solid',
    borderColor: 'secondary2.light',
    borderRadius: '1rem',
    padding: '1rem',
    width: {
      xs: '100%',
      md: '70%',
      lg: '100%',
    },
  },
  payment_accommodation: {
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '1rem',
  },
  paymanet_accommodation_image: {
    'flex': {
      xs: '0.5',
      md: '0.45',
    },
    'maxWidth': '180px',
    'maxHeight': '170px',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '0.5rem',
    },
  },
  payment_accommodation_details: {
    flex: {
      xs: '0.5',
      md: '0.55',
    },
  },
} satisfies MuiStylesObject;
