import { Box, Skeleton } from '@mui/material';
import { accommodationCardStyles } from '@src/components/card/acccommodationCard/accommodationCard.styles';
import { AMOUNT_PER_PAGE } from '@src/config/pagination.config';
import { mainStyles } from '@src/pages/main/index.styles';

export default function AccommodationSkeleton() {
  return (
    <Box sx={mainStyles.accommmodationCard} mt={10}>
      {Array.from({ length: AMOUNT_PER_PAGE }).map((_, i) => (
        <Box key={i} sx={accommodationCardStyles.root}>
          <Skeleton variant="rounded" width="100%" height={230} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="75%" />
          <Skeleton variant="text" width="50%" />
        </Box>
      ))}
    </Box>
  );
}
