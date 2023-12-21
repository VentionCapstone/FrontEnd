import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { MoreLessText } from '../../../components/more-less-text/MoreLessText';

interface Review {
  username: string;
  country: string;
  comment: string;
}

export const Review = ({ review }: { review: Review }) => {
  const { username, country, comment } = review;

  return (
    <>
      <Box
        display={'grid'}
        gridTemplateColumns={'min-content auto'}
        alignItems={'center'}
        columnGap={4}
        rowGap={3}
        mb={3}
      >
        <Box
          sx={{
            width: '4rem',
            height: '4rem',
            bgcolor: 'secondary2.light',
            borderRadius: '50%',
          }}
        ></Box>

        <Box>
          <Typography fontWeight={600} lineHeight={'1.2rem'}>
            {username}
          </Typography>
          <Typography variant="sm" component={'p'}>
            {country}
          </Typography>
        </Box>

        <Rating
          value={5}
          size={'small'}
          readOnly
          sx={{
            '& .MuiRating-iconFilled': {
              color: 'primary.main',
            },
            '& .MuiRating-iconHover': {
              color: 'secondary.main',
            },
            'fontSize': '0.75rem',
          }}
        />

        <Typography variant={'sm'} fontWeight={600} color={'secondary2.main'}>
          2 weeks ago
        </Typography>
      </Box>

      <MoreLessText text={comment} maxChars={200} />
    </>
  );
};
