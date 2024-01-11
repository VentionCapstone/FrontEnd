import { Box, Typography } from '@mui/material';

import { AmenitySetting } from '@/types/amenity.types';
import { styles } from './AmenityList.styles';

function AmenityList({ amenities }: { amenities: AmenitySetting[] }) {
  return (
    <Box marginY={4}>
      <Typography sx={styles.heading}>What this place offers</Typography>
      <Box sx={styles.container}>
        {amenities.map(({ id, name, icon }) => (
          <Box key={id} sx={styles.box}>
            <Box>{icon}</Box>
            <Typography>{name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default AmenityList;
