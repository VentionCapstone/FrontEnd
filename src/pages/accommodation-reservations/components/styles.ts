export const AccommodationBookingsStyles = {
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: {
      xs: 'column',
      lg: 'row',
    },
    mt: 7,
  },

  dateRangeContainer: {
    textAlign: 'center',
    position: 'sticky',
    fontSize: {
      xs: '12px',
      sm: '13px',
    },
    top: '100px',
    flex: 'none',
    minWidth: '200px',
    height: {
      lg: '600px',
    },
    width: {
      xs: '100%',
      lg: 'auto',
    },
  },
  mainTable: { minWidth: '610px' },

  tableContainer: {
    marginRight: 7,
    marginBottom: 7,
    boxShadow: 6,
  },

  tableCell: { display: 'flex', alignItems: 'center', padding: '14px 12px' },
  tableRow: {
    'transitionDuration': '0.4s',

    ':hover': {
      backgroundColor: '#58598936',
    },
  },
  notFoundText: { textAlign: 'center', padding: '20px', fontSize: '20px' },

  imageContainer(borderColor: string) {
    return {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      marginRight: '15px',
      flexShrink: 0,
      border: '3px solid',
      borderColor: borderColor,
      position: 'relative',
      zIndex: 1,
    };
  },
  coloredLine(bgColor: string) {
    return {
      width: '90px',
      height: '7px',
      background: bgColor,
      borderRadius: '20px',
      marginBottom: '5px',
      marginTop: '-6px',
    };
  },
};
