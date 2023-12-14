import { MuiStylesObject } from '../types/utility.types';

export const mainNavigationStyles: MuiStylesObject = {
  container: {
    padding: '1rem',
  },
  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoBox: {
    'display': 'flex',
    'alignItems': 'center',
    '& img': {
      width: '2.5rem',
      height: '2.5rem',
    },
    '& a': {
      textDecoration: 'none',
    },
  },
  logoText: {
    marginLeft: '1rem',
    color: 'secondary.main',
    fontWeight: 'bold',
    marginX: '0.5rem',
  },
  button: {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'space-between',
    'textTransform': 'none',
    'borderRadius': '2rem',
    'borderColor': 'secondary2.main',
    'color': 'secondary2.main',
    'borderWidth': '1px',
    'borderStyle': 'solid',
    '& svg': {
      marginLeft: '0.5rem',
    },
  },
  menu: {
    'mt': '0.4rem',
    '& a': {
      color: 'primary.main',
      textDecoration: 'none',
    },
  },
};
