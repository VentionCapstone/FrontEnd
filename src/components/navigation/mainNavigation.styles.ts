import { MuiStylesObject } from '../../types/utility.types';

export const mainNavigationStyles = {
  navigation: {
    display: {
      xs: 'none',
      md: 'block',
    },
    position: 'sticky',
    top: 0,
    left: 0,
    borderBottom: '1px solid',
    borderColor: 'secondary2.light',
    color: 'primary.main',
    zIndex: 100,
  },

  bottomNav: {
    'display': {
      xs: 'flex',
      md: 'none',
    },
    '.MuiBottomNavigationAction-root': { color: 'secondary2.main', gap: '0.25rem' },
    '& .Mui-selected, .Mui-selected svg': { color: 'secondary.main', fontWeight: 600 },
  },

  button: {
    'display': 'flex',
    'alignItems': 'center',
    'padding': 1,
    'textTransform': 'none',
    'borderRadius': '2rem',
    'border': '1px solid',
    'borderColor': 'secondary2.light',
    '&:hover': {
      bgcolor: 'background.default',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)',
    },
  },

  menu: {
    'mt': 2,
    '& a': {
      color: 'primary.main',
      textDecoration: 'none',
      width: '100%',
    },
  },
} satisfies MuiStylesObject;
