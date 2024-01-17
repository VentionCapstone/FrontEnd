import { MuiStylesObject } from '@src/types/utility.types';

export const styles = {
  formContainer: {
    mx: 'auto',
    mt: '5%',
    border: '1px solid ',
    borderColor: 'secondary2.light',
    borderRadius: 2,
    maxWidth: '600px',
  },
  formLink: { color: 'primary.main' },
  formForgotPasswordContainer: {
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'underline',
  },
  formForgotPasswordButton: {
    'margin': '0',
    'padding': '0',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
} satisfies MuiStylesObject;
