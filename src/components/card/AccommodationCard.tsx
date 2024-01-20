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

function AccommodationCard({
  accommodation: {
    thumbnailUrl,
    id,
    price,
    address: { country, city },
  },
}: {
  accommodation: Accommodation;
}) {
  return (
    <Box sx={accommodationCardStyles.root}>
      <Link to={`/rooms/${id}`}>
        <Stack gap={3} width="100%">
          <Box sx={accommodationCardStyles.imageBox}>
            <CustomImage image={thumbnailUrl} name={country} />
            <Box sx={accommodationCardStyles.favoriteIcon}>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
            </Box>
          </Box>
          <Stack>
            <Typography mt={2}>
              {city}, {country}
            </Typography>
            <Typography>
              <Box component={'span'} fontWeight={800}>
                ${price}{' '}
              </Box>
              night
            </Typography>
          </Stack>
        </Stack>
      </Link>
    </Box>
  );
}

const MemoizedAccommodationCard = memo(AccommodationCard);
export default MemoizedAccommodationCard;
