import { Box, Typography, IconButton, Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Accommodation } from '../../types/accommodation.types';
import SingleImage from '../shared/Image';

function AccommodationCard({ accommodation }: { accommodation: Accommodation }) {
  return (
    <Box
      sx={{
        flex: {
          'xs': '1 1 100%',
          'sm': '1 1 48%',
          'md': '0 1 31.5%',
          'lg': '0 1 23.5%',
          '2xl': '0 1 19%',
        },
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
          }}
        >
          <SingleImage image={accommodation.thumbnailUrl} name={accommodation.address.country} />
          <Box sx={{ position: 'absolute', top: 3, right: 3 }}>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
          </Box>
        </Box>
        <Stack>
          <Typography mt={2} fontWeight={700}>
            {accommodation.address.country}
          </Typography>
          <Typography color={'secondary2.main'}>Mar 17 - 22</Typography>
          <Typography fontWeight={700}>${accommodation.price} night</Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default AccommodationCard;
