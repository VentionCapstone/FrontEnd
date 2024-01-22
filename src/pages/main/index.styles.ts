import { pink } from '@mui/material/colors';
import { MuiStylesObject } from '@src/types/utility.types';

export const mainStyles = {
  badgeNumber: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  filterButton: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0',
    margin: '0',
    borderRadius: '50%',
    width: {
      xs: '40px',
      md: '50px',
    },
    height: {
      xs: '40px',
      md: '50px',
    },
    minWidth: {
      xs: '40px',
      md: '50px',
    },
    color: 'secondary2.main',
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
    width: '98%',
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
    width: 50,
    height: 50,
    minWidth: 50,
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
