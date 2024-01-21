import { Box } from '@mui/system';

import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { List, Typography } from '@mui/material';
import { FONT_SIZES } from '@src/theme/themeTokens';
import { HostProfile } from '@src/types/hostProfile.types';

function HostProfileCard({ host }: { host: HostProfile }) {
  const { firstName, imageUrl, isVerified, reviews, rating, accommodations } = host;

  return (
    <Box
      sx={{
        flex: '1',
        borderRadius: 5,
        border: '2px solid #00000005',
        px: '1rem',
        py: '.5rem',
        boxShadow: 5,
        display: 'flex',
        gap: '1.5rem',
      }}
    >
      <Box
        sx={{
          width: '58%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={imageUrl}
            alt="profile picture"
            sx={{
              width: '6.5rem',
              height: '6.5rem',
              objectFit: 'cover',
              borderRadius: '50%',
              mb: '0.7rem',
            }}
          />
          {isVerified && (
            <Box
              component={VerifiedIcon}
              sx={{
                position: 'absolute',
                right: -4,
                bottom: 7,
                width: '2.1rem',
                height: '2.1rem',
                color: 'secondary.main',
                stroke: '#fff',
              }}
            />
          )}
        </Box>
        <Typography variant="h2" fontSize="2.2rem" fontWeight="700">
          {firstName}
        </Typography>
        <Typography fontWeight="600">Host</Typography>
      </Box>
      <List
        sx={{
          'display': 'flex',
          'flexDirection': 'column',
          'flexGrow': 1,
          '& > *:not(:last-child)': {
            borderBottom: '1px solid #e0e0e0',
          },
          '& > *': {
            py: '0.8rem',
          },
        }}
      >
        <Box component="li">
          <Typography
            variant="subtitle2"
            fontSize={FONT_SIZES.md}
            fontWeight="700"
            lineHeight="1"
            pb="0.2rem"
          >
            {reviews.count}
          </Typography>
          <Typography fontWeight="700" fontSize="0.8rem">
            Reviews
          </Typography>
        </Box>
        <Box component="li">
          <Typography
            variant="subtitle2"
            fontSize={FONT_SIZES.md}
            fontWeight="700"
            lineHeight="1"
            pb="0.2rem"
          >
            {parseFloat(rating || '0.0').toFixed(1)}
            <StarIcon
              fontSize="small"
              sx={{
                ml: '0.1rem',
                pt: '0.2rem',
              }}
            />
          </Typography>
          <Typography fontWeight="700" fontSize="0.8rem">
            Rating
          </Typography>
        </Box>
        <Box component="li">
          <Typography
            variant="subtitle2"
            fontSize={FONT_SIZES.md}
            fontWeight="700"
            lineHeight="1"
            pb="0.2rem"
          >
            {accommodations?.length || 0}
          </Typography>
          <Typography fontWeight="700" fontSize="0.8rem">
            Listings
          </Typography>
        </Box>
      </List>
    </Box>
  );
}

export default HostProfileCard;
