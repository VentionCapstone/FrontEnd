import { MuiStylesObject } from '@src/types/utility.types';

export const mainStyles = {
  badgeNumber: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },

  filterButton: {
    padding: '0',
    margin: '0',
    borderRadius: { md: '50%' },
    borderColor: 'secondary2.light',
    width: {
      xs: '35px',
      md: '50px',
    },
    height: {
      xs: '35px',
      md: '50px',
    },
    minWidth: 0,
    color: 'secondary2.main',
  },

  accommmodationCard: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 4,
    justifyContent: 'space-between',
  },

  searchInput: {
    'width': '100%',
    '& fieldset': {
      borderColor: 'secondary2.light',
    },
    '.MuiInputBase-root': {
      borderRadius: {
        xs: 2,
        md: '999px',
      },
    },
    '.MuiInputBase-input': {
      fontSize: '0.875rem',
    },
  },

  searchBarBox: {
    display: 'flex',
    gap: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    bgcolor: 'background.default',
    borderBottom: '1px solid',
    borderColor: 'secondary2.light',
    mb: {
      xs: 'none',
      md: 6,
    },
    p: {
      xs: '1rem 1.5rem',
      md: 0,
    },
    position: {
      xs: 'fixed',
      md: 'static',
    },
    top: {
      xs: 0,
      md: 'auto',
    },
    left: {
      xs: 0,
      md: 'auto',
    },
    right: {
      xs: 0,
      md: 'auto',
    },
    border: {
      md: 'none',
    },
    zIndex: {
      xs: 100,
      md: 0,
    },
    boxShadow: { xs: '0px 4px 8px rgba(0, 0, 0, 0.12)', md: 'none' },
  },

  searchDesktopContainer: {
    p: 0,
    ml: 0,
    display: {
      xs: 'none',
      md: 'flex',
    },
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 2,
    width: '100%',
  },

  searchButton: {
    'borderRadius': '50%',
    'width': 50,
    'height': 50,
    'minWidth': 50,
    'ml': 6,
    'backgroundColor': 'secondary.main',
    'padding': 0,
    ':hover': {
      bgcolor: 'secondary.dark',
    },
  },

  mobileSearchBarButton: {
    display: {
      xs: 'flex',
      md: 'none',
    },
    padding: '0',
    margin: '0',
    border: '1px solid',
    borderRadius: { md: '50%' },
    borderColor: 'secondary2.light',
    width: '35px',
    height: '35px',
    minWidth: 0,
    color: 'secondary2.main',
  },
} satisfies MuiStylesObject;
