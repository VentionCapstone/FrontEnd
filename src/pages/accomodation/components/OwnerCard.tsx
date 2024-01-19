import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Typography } from '@mui/material';
import { Owner } from '@src/types/accommodation.types';
import * as dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function OwnerCard({ owner }: { owner: Owner }) {
  return (
    <Box
      sx={{
        m: '5% auto',
        maxWidth: '400px',
        borderRadius: 3,
        border: '1px solid #b0b0b0 ',
        p: '1.5em',
        boxShadow: 5,
      }}
    >
      <Typography variant="h6">Hosted by</Typography>
      <Link to={`/users/${owner.id}`} style={{ textDecoration: 'none' }}>
        <Box display="flex" alignItems="center" mt={3} gap={2}>
          <Box sx={{ position: 'relative' }}>
            <Box
              component={'img'}
              src={owner.profile.imageUrl}
              alt={owner.firstName}
              sx={{
                width: '4rem',
                height: '4rem',
                bgcolor: 'secondary2.light',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            {owner.isVerified && (
              <Box
                component={VerifiedIcon}
                sx={{
                  position: 'absolute',
                  right: -5,
                  bottom: -5,
                  width: '1.5rem',
                  height: '1.5rem',
                  color: 'secondary.main',
                  stroke: '#fff',
                }}
              />
            )}
          </Box>
          <Box ml={2}>
            <Typography
              fontWeight={600}
              variant="h6"
            >{`${owner.firstName} ${owner.lastName}`}</Typography>
            <Typography variant="body2" color="text.secondary">
              Joined in {dayjs(owner.createdAt).format('MMMM YYYY')} · {owner.profile.country}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}

export default OwnerCard;
