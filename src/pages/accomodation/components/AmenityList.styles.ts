import { MuiStylesObject } from '@src/types/utility.types';

export const styles = {
  heading: {
    fontWeight: 'bold',
    fontSize: {
      xs: '1rem',
      md: '1.3rem',
    },
    marginBottom: '1rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 2,
  },
  box: {
    display: 'flex',
    gap: 4,
    width: '48%',
    alignItems: 'center',
  },
} satisfies MuiStylesObject;
