import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { MoreLessText } from '@src/components/more-less-text/MoreLessText';
import { FONT_SIZES } from '@src/theme/themeTokens';
import { Review as ReviewType } from '@src/types/reviews.types';

dayjs.extend(relativeTime);

export const Review = ({ review }: { review: ReviewType }) => {
  const {
    feedback,
    rating,
    createdAt,
    user: { firstName, lastName, profile },
  } = review;

  const userImage = profile?.imageUrl ?? '';
  const formattedTime = dayjs(createdAt).fromNow();

  return (
    <Box>
      <Box
        display={'grid'}
        gridTemplateColumns={'min-content auto'}
        alignItems={'center'}
        columnGap={{ xs: 3, md: 4 }}
        rowGap={{ xs: 2, md: 3 }}
        mb={{ xs: 2, md: 3 }}
      >
        <Box
          component={'img'}
          src={userImage}
          alt="user-image"
          sx={{
            width: '4rem',
            height: '4rem',
            bgcolor: 'secondary2.light',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />

        <Box>
          <Typography fontWeight={600} lineHeight={'1.2rem'}>
            {firstName + ' ' + lastName}
          </Typography>
          <Typography variant="sm" component={'p'}>
            {profile.country}
          </Typography>
        </Box>

        <Rating
          value={rating}
          readOnly
          sx={{
            '& .MuiRating-iconFilled': {
              color: 'primary.main',
            },
            'fontSize': FONT_SIZES.xs.fontSize,
          }}
        />

        <Typography variant={'sm'} fontWeight={600} color={'secondary2.main'}>
          {formattedTime}
        </Typography>
      </Box>

      <MoreLessText text={feedback} maxChars={200} />
    </Box>
  );
};
