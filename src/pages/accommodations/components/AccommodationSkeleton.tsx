import { Box, Skeleton } from '@mui/material';
import { AMOUNT_PER_PAGE } from '@src/config/pagination.config';

export default function AccommodationSkeleton() {
  return Array.from({ length: AMOUNT_PER_PAGE }).map((_, i) => (
    <Box
      key={i}
      sx={{
        flex: {
          xs: '1 1 100%',
          sm: '1 1 48.5%',
          md: '0 1 31.5%',
          lg: '0 1 23.5%',
        },
        mt: 8,
      }}
    >
      <Skeleton variant="rounded" width="100%" height={230} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="75%" />
      <Skeleton variant="text" width="50%" />
    </Box>
  ));
}
