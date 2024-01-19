import { MuiStylesObject } from '@src/types/utility.types';

export const styles = {
  image_left: {
    '& img': {
      width: '100%',
      objectFit: 'cover',
      borderTopLeftRadius: '15px',
      borderBottomLeftRadius: '15px',
      borderTopRightRadius: {
        xs: '15px',
        md: '0',
      },
      borderBottomRightRadius: {
        xs: '15px',
        md: '0',
      },
      height: {
        'xs': '310px',
        'sm': '360px',
        'md': '408px',
        'lg': '458px',
        'xl': '558px',
        '2xl': '608px',
      },
    },
  },
  image_list: {
    'display': {
      xs: 'none',
      md: 'flex',
    },
    '& img': {
      width: '100%',
      objectFit: 'cover',
      height: {
        'md': '200px',
        'lg': '225px',
        'xl': '275px',
        '2xl': '300px',
      },
    },
  },
  image_right_top: {
    '& img': {
      borderTopRightRadius: '15px',
    },
  },
  image_right_bottom: {
    '& img': {
      borderBottomRightRadius: '15px',
    },
  },
  heading: {
    fontWeight: 'bold',
    fontSize: {
      xs: '1rem',
      md: '1.3rem',
    },
    marginBottom: '1rem',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 3,
    flexDirection: {
      xs: 'column',
      lg: 'row',
    },
    mt: 7,
  },
  content_price: {
    display: 'flex',
    justifyContent: 'space-between',
  },
} satisfies MuiStylesObject;
