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
    display: 'flex',
    flexDirection: 'column' as const,
    height: {
      xs: '92%',
      sm: '85%',
    },
    borderRadius: {
      xs: '0.75rem 0.75rem 0 0',
      sm: '0.75rem',
    },
  },

  closeButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    'padding': 0,
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

  searchCloseButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    'padding': 0,
    'display': 'flex',
    'justifyContent': 'end',
    'color': 'secondary2.main',
    'marginLeft': 'auto',
    'minWidth': '0',
  },

  modalFooter: {
    justifyContent: 'space-between',
    gap: 2,
    py: 4,
    px: 5,
    borderTop: '1px solid',
    borderColor: 'secondary2.light',
  },

  modalHeader: {
    justifyContent: 'space-between',
    gap: 2,
    py: 4,
    px: 5,
    borderBottom: '1px solid',
    borderColor: 'secondary2.light',
  },
} satisfies MuiStylesObject;
