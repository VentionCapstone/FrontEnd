import { MuiStylesObject } from '../../../types/utility.types';

export const editPageStyles = {
  userImage: {
    width: {
      xs: '9rem',
      md: '12rem',
    },
    height: {
      xs: '9rem',
      md: '12rem',
    },
    bgcolor: 'primary.main',
    borderRadius: '50%',
    flexShrink: 0,
    objectFit: 'cover',
  },

  fullName: {
    display: '-webkit-box',
    mt: 4,
    mb: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflowWrap: 'break-word',
  },

  customCard: {
    height: '100%',
    gap: '1rem',
    flexDirection: {
      xs: 'row',
      md: 'column',
    },
    alignItems: {
      xs: 'center',
      md: 'stretch',
    },
    borderBottom: {
      xs: '1px solid #EBEBEB',
    },
    border: {
      md: 'none',
    },
    padding: {
      xs: '1rem 0',
      md: '1rem',
    },
    boxShadow: {
      md: '0px 6px 16px rgba(0, 0, 0, 0.12)',
    },
    borderRadius: {
      md: '0.75rem',
    },
  },

  logoutButton: {
    display: {
      md: 'none',
    },
    mt: 12,
    padding: 3,
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: 3,
  },

  card: {
    display: {
      md: 'none',
    },
    padding: 6,
    borderRadius: 3,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.12)',
  },
} satisfies MuiStylesObject;
