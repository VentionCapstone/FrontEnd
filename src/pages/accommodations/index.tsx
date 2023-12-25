// type Props = {};

import { Add } from '@mui/icons-material';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { useGetAccommodations } from '@/api/queries/accommodations/useGetAccommodations';
import { ROUTES } from '@/config/routes.config';
import { lineClampStyle } from '@/utils';

export default function Accommodations() {
  const { data: accommodations, isLoading } = useGetAccommodations();

  const onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300';
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" my={8}>
        <h1>Your Accommodations</h1>
        <Link to={ROUTES.accommodations.create}>
          <IconButton>
            <Add />
          </IconButton>
        </Link>
      </Box>
      {/* List */}
      <Box display="grid" gap={8} gridTemplateColumns={'repeat(auto-fill, minmax(280px, 1fr))'}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Box key={i} display="flex" flexDirection="column" gap={2}>
                <Skeleton variant="rounded" width="100%" height={280} />
                <Skeleton variant="text" width="100%" />
              </Box>
            ))
          : accommodations?.data.data.slice(0, 10).map((accommodation) => (
              <Link
                to={ROUTES.accommodations.edit(accommodation.id)}
                key={accommodation.id}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box width="100%" height={280} borderRadius={2} overflow="hidden">
                    <img
                      width="100%"
                      height="100%"
                      onError={onError}
                      style={{ objectFit: 'cover' }}
                      alt={`${accommodation.id} thumbnail`}
                      src={accommodation.thumbnailUrl || accommodation.previewImgUrl}
                    />
                  </Box>
                  <Typography variant="body1" sx={lineClampStyle(1)}>
                    {accommodation.title}
                  </Typography>
                </Box>
              </Link>
            ))}
      </Box>
    </Box>
  );
}
