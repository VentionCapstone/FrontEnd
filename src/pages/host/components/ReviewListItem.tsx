import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { DATE_MONTH_YEAR_FORMAT } from '@src/constants';
import { HostReviews } from '@src/types/hostProfile.types';

const ReviewListItem = ({ review, joinedAt }: { review: HostReviews; joinedAt: string }) => {
  return (
    <Stack
      key={review.id}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'secondary2.light',
        py: 4,
        px: 6,
        gap: 4,
      }}
    >
      <Stack direction={'row'} alignItems={'center'} gap={3}>
        <Box
          component={'img'}
          src={review.user.profile.imageUrl}
          sx={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }}
        />
        <Box>
          <Typography fontWeight={600}>
            {review.user.firstName} {review.user.lastName}
          </Typography>
          <Typography variant="sm" color={'secondary2.main'}>
            {dayjs(joinedAt).format(DATE_MONTH_YEAR_FORMAT)}
          </Typography>
        </Box>
      </Stack>

      <Box height={'6.5rem'}>
        <Typography
          sx={{
            maxHeight: '100%',
            display: '-webkit-box',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            whiteSpace: 'pre-wrap',
            WebkitLineClamp: 4,
          }}
        >
          {review.feedback}
        </Typography>
      </Box>
    </Stack>
  );
};

export default ReviewListItem;
