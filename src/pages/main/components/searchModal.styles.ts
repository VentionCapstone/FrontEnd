import { MuiStylesObject } from '@/types/utility.types';

export const searchModalStyles: MuiStylesObject = {
  modalContainer: {
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
  closeButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    'padding': 0,
    'display': 'flex',
    'justifyContent': 'end',
  },
};
