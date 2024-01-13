import { MuiStylesObject } from '@src/types/utility.types';

export const footerStyles = {
  stickyFooter: {
    display: {
      xs: 'none',
      md: 'block',
    },
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: '1px solid',
    borderColor: 'secondary2.light',
    color: 'primary.main',
    bgcolor: 'backgroundSecondary.main',
  },

  footer: {
    borderTop: '1px solid',
    borderColor: 'secondary2.light',
    color: 'primary.main',
    bgcolor: 'backgroundFooter.main',
  },
} satisfies MuiStylesObject;
