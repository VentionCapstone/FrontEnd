import { MuiStylesObject } from '@src/types/utility.types';
import { pink } from '@mui/material/colors';

export const mainStyles = {
  badgeNumber: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  filterButtonDesktop: {
    display: {
      xs: 'none',
      md: 'flex',
    },
  },
  filterButtonMobile: {
    display: {
      xs: 'flex',
      md: 'none',
    },
    gap: '0.5rem',
    padding: '0',
    margin: '0',
    borderRadius: '50%',
    borderColor: 'black',
    width: '40px',
    height: '40px',
    minWidth: 0,
  },
  filterButton: {
    'display': 'flex',
    'marginLeft': 'auto',
    'gap': '0.5rem',
    'padding': '0.5rem',
    'marginBottom': '2rem',
    'borderRadius': '0.5rem',
    'color': 'secondary2.main',
    'borderColor': 'secondary2.light',
    ':hover': {
      borderColor: 'secondary2.light',
    },
  },
  accommmodationCard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    columnGap: 4,
  },
  searchInput: {
    'width': {
      md: '30%',
    },
    '.MuiInputBase-root': {
      borderRadius: '40px',
      border: 'none',
    },
  },
  searchBarBox: {
    display: 'flex',
    margin: 2,
    gap: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    mb: 8,
    width: '97%',
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
    borderRadius: '50%',
    width: 40,
    height: 40,
    minWidth: 40,
    backgroundColor: pink[500],
    padding: 0,
  },
  mobileSearchBarButton: {
    border: '1px solid black',
    borderRadius: '40px',
    width: '100%',
    display: {
      xs: 'flex',
      md: 'none',
    },
  },
} satisfies MuiStylesObject;
