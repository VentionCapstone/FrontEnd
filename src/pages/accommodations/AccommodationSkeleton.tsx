import { Box, Skeleton } from '@mui/material';

export default function AccommodationSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => (
    <Box key={i} display="flex" flexDirection="column" gap={2}>
      <Skeleton variant="rounded" width="100%" height={280} />
      <Skeleton variant="text" width="100%" />
    </Box>
  ));
}
