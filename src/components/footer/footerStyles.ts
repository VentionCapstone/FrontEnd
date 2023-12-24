import { MuiStylesObject } from '../../types/utility.types';

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
    bgcolor: 'background.default',
    borderTop: '1px solid',
    borderColor: 'secondary2.light',
    color: 'primary.main',
  },

  footer: {
    bgcolor: '#F7F7F7',
    borderTop: '1px solid',
    borderColor: 'secondary2.light',
    color: 'primary.main',
  },
} satisfies MuiStylesObject;
