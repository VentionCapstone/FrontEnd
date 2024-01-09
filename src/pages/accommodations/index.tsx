// type Props = {};

import { Add } from '@mui/icons-material';
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { useGetAccommodations } from '@/api/queries/accommodations/useGetAccommodations';
import { ROUTES } from '@/config/routes.config';
import { useAppSelector } from '@/hooks/redux-hooks';
import { getUser } from '@/stores/slices/authSlice';
import { lineClampStyle } from '@/utils';

export default function Accommodations() {
  const profileId = useAppSelector(getUser)?.id ?? '';
  const { data: accommodations, isLoading } = useGetAccommodations(profileId);

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
                  <Box
                    width="100%"
                    height={280}
                    position="relative"
                    borderRadius={2}
                    overflow="hidden"
                  >
                    <img
                      width="100%"
                      height="100%"
                      onError={onError}
                      style={{ objectFit: 'cover' }}
                      alt={`${accommodation.id} thumbnail`}
                      src={accommodation.thumbnailUrl || accommodation.previewImgUrl}
                    />
                    {accommodation.isDeleted && (
                      <Box
                        component="div"
                        position="absolute"
                        top={0}
                        right={0}
                        padding={1.5}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                        borderRadius="0 0 0 8px"
                        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                      >
                        <Typography
                          variant="caption"
                          color="error"
                          fontSize="1.2em"
                          fontWeight="600"
                        >
                          Deleted
                        </Typography>
                      </Box>
                    )}
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
