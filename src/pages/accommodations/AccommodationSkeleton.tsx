import { Box, Skeleton } from '@mui/material';
import { AMOUNT_PER_PAGE } from '@src/config/pagination.config';

export default function AccommodationSkeleton() {
  return Array.from({ length: AMOUNT_PER_PAGE }).map((_, i) => (
    <Box key={i} display="flex" flexDirection="column" gap={2} mt={3}>
      <Skeleton variant="rounded" width="100%" height={280} />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="50%" />
    </Box>
  ));
}
