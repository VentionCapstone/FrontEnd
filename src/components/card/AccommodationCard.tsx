import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Accommodation } from '@src/types/accommodation.types';
import { MuiStylesObject } from '@src/types/utility.types';
import CustomImage from '../shared/CustomImage';

const accommodationCardStyles = {
  root: {
    flex: {
      xs: '1 1 100%',
      sm: '1 1 48.5%',
      md: '0 1 31.5%',
      lg: '0 1 23.5%',
    },
    cursor: 'pointer',
    a: {
      textDecoration: 'none',
    },
  },
  imageBox: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 3,
  },
  favoriteIcon: { position: 'absolute', top: 3, right: 3 },
} satisfies MuiStylesObject;

function AccommodationCard({ accommodation }: { accommodation: Accommodation }) {
  return (
    <Box sx={accommodationCardStyles.root}>
      <Link to={`/rooms/${accommodation.id}`}>
        <Stack gap={3} width="100%">
          <Box sx={accommodationCardStyles.imageBox}>
            <CustomImage image={accommodation.thumbnailUrl} name={accommodation.address.country} />
            <Box sx={accommodationCardStyles.favoriteIcon}>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </Box>
          </Box>
          <Stack>
            <Typography mt={2}>{accommodation.address.country}</Typography>
            <Typography>
              <Box component={'span'} fontWeight={800}>
                ${accommodation.price}{' '}
              </Box>
              night
            </Typography>
          </Stack>
        </Stack>
      </Link>
    </Box>
  );
}

export default memo(AccommodationCard);
