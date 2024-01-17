import { MuiStylesObject } from '@src/types/utility.types';

export const mainStyles = {
  badgeNumber: {
    display: 'flex',
    justifyContent: 'end',
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
} satisfies MuiStylesObject;
