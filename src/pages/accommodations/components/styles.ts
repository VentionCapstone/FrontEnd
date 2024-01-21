import { MuiStylesObject } from '@src/types/utility.types';

export const uploadMediaStyles = {
  uploadContainer: {
    width: {
      xs: '100%',
      sm: '80%',
      md: '70%',
      lg: '60%',
      xl: '50%',
    },
    mx: 'auto',
    border: '1px dashed',
    borderColor: 'secondary2.light',
    borderRadius: 4,
    height: '400px',
    mt: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: { fontSize: 50, color: 'secondary2.main' },
  listOfImagesContainer: {
    width: {
      xs: '100%',
      sm: '80%',
      md: '77%',
      lg: '65%',
      xl: '50%',
    },
    mx: 'auto',
    mt: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    rowGap: 4,
    columnGap: 3,
  },
  imageContainer: {
    maxWidth: {
      xs: '250px',
      sm: '240px',
      md: '260px',
      lg: '300px',
    },
    maxHeight: '250px',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 4,
  },
  imageActionContainer: {
    position: 'absolute',
    top: '3%',
    right: '3%',
  },
  imageAction: {
    'backgroundColor': 'secondary2.light',
    'mr': 2,
    '&:hover': {
      backgroundColor: 'secondary2.main',
      color: 'secondary2.light',
    },
  },
  mainButton: {
    marginTop: 2,
    width: {
      xs: '40%',
      sm: '26%',
      md: '20%',
      lg: '12%',
      xl: '10%',
    },
    ml: 'auto',
  },
} satisfies MuiStylesObject;
