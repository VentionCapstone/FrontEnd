import { Box, Typography } from '@mui/material';

import { AmenitySetting } from '@src/types/amenity.types';
import { AminitiesList } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import { styles } from './AmenityList.styles';

function AmenityList({ amenities }: { amenities: AmenitySetting[] }) {
  const { t } = useTranslation();
  return (
    <Box marginY={4}>
      <Typography sx={styles.heading}>{t(AminitiesList.title)}</Typography>
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
