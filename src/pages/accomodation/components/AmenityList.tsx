import { Box, Typography } from '@mui/material';
import { AmenitySetting } from '../../../types/amenity.types';
import { MuiStylesObject } from '../../../types/utility.types';

function AmenityList({ amenities }: { amenities: AmenitySetting[] }) {
  const styles = {
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

  return (
    <Box marginY={4}>
      <Typography sx={styles.heading}>What this place offers</Typography>
      <Box sx={styles.container}>
        {amenities.map((amenity) => (
          <Box key={amenity.id} sx={styles.box}>
            <Box>{amenity.icon}</Box>
            <Typography>{amenity.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default AmenityList;
