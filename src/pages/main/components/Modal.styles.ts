import { MuiStylesObject } from '@src/types/utility.types';

export const modalStyles = {
  modalContainer: {
    position: 'absolute' as const,
    bottom: {
      xs: '0',
      sm: 'unset',
    },
    left: {
      sm: '50%',
    },
    top: {
      sm: '50%',
    },
    width: {
      xs: '100%',
      sm: '80%',
      md: '63%',
      lg: '50%',
      xl: '40%',
    },
    transform: {
      sm: 'translate(-50%, -50%)',
    },
    bgcolor: 'background.paper',
    p: 7,
    display: 'flex',
    flexDirection: 'column' as const,
    height: {
      xs: '92%',
      sm: '85%',
    },
  },
  closeButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    'padding': 0,
    'display': 'flex',
    'justifyContent': 'end',
  },
  sliderContainer: {
    width: {
      xs: '85%',
    },
    marginX: 'auto',
    marginTop: '1rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '1rem',
    marginTop: '1rem',
  },
  searchModalContainer: {
    position: 'absolute' as const,
    bottom: {
      xs: 0,
      sm: 'unset',
    },
    left: {
      xs: 0,
      sm: '50%',
    },
    top: {
      xs: 0,
      sm: '50%',
    },
    width: {
      xs: '100%',
      sm: '80%',
      md: '63%',
      lg: '50%',
      xl: '40%',
    },
    transform: {
      sm: 'translate(-50%, -50%)',
    },
    bgcolor: 'background.paper',
    p: 7,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },
  searchCloseButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    'padding': 0,
    'display': 'flex',
    'justifyContent': 'end',
  },
} satisfies MuiStylesObject;
