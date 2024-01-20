import { Box } from '@mui/system';

import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { List, Typography } from '@mui/material';
import { HostProfile } from '@src/types/hostProfile.types';

function HostProfileCard({ host }: { host: HostProfile }) {
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
            src={host.imageUrl}
            alt="profile picture"
            sx={{
              width: '6.5rem',
              height: '6.5rem',
              objectFit: 'cover',
              borderRadius: '50%',
              mb: '0.7rem',
            }}
          />
          {host.isVerified && (
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
          {host.firstName}
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
            fontSize="1.2rem"
            fontWeight="700"
            lineHeight="1"
            pb="0.2rem"
          >
            {host.reviews.count}
          </Typography>
          <Typography fontWeight="700" fontSize="0.8rem">
            Reviews
          </Typography>
        </Box>
        <Box component="li">
          <Typography
            variant="subtitle2"
            fontSize="1.2rem"
            fontWeight="700"
            lineHeight="1"
            pb="0.2rem"
          >
            {parseFloat(host.rating).toFixed(1)}
            <StarIcon
              fontSize="small"
              sx={{
                verticalAlign: 'top',
                ml: '0.1rem',
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
            fontSize="1.2rem"
            fontWeight="700"
            lineHeight="1"
            pb="0.2rem"
          >
            {host.accommodations.length}
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
