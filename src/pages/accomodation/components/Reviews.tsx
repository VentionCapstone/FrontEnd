import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCallback, useState } from 'react';

import { Review } from './Review';
import useGetReviewsQuery from '../../../api/queries/reviews/useGetReviewsQuery';
import LoadingPrimary from '../../../components/loader/LoadingPrimary';

export const Reviews = ({ accommodationId }: { accommodationId: string }) => {
  const { data: reviews, isError, isLoading } = useGetReviewsQuery(accommodationId);
  const [open, setOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('recent');

  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleModal = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleChange = useCallback((e: SelectChangeEvent) => {
    setSelectedSort(e.target.value);
  }, []);

  if (isLoading || isError) return <LoadingPrimary />;

  return reviews?.data?.length ? (
    <Box>
      <Stack
        alignItems={'center'}
        pb={12}
        borderBottom={'1px solid'}
        borderColor={'secondary2.light'}
        mb={12}
      >
        <Typography fontSize={'2rem'}>Rating</Typography>
        <Typography fontSize={'3.5rem'} fontWeight={600}>
          {reviews.averageRate.toFixed(1)}
        </Typography>
        <Rating
          readOnly
          value={reviews.averageRate}
          precision={0.5}
          sx={{
            '& .MuiRating-iconFilled': {
              color: 'secondary.main',
            },
            'fontSize': '2rem',
            'flexShrink': 0,
          }}
        />
      </Stack>

      <Grid container spacing={{ xs: 8, lg: 16 }}>
        {reviews.data.slice(0, 4).map((review) => (
          <Grid key={review.id} item xs={12} lg={6}>
            <Review review={review} />
          </Grid>
        ))}
      </Grid>

      <Button
        onClick={toggleModal}
        variant={'outlined'}
        sx={{
          display: 'block',
          mt: { xs: 8, lg: 16 },
          mr: 'auto',
          fontWeight: 600,
          textTransform: 'none',
        }}
      >
        {`Show all ${reviews.totalNumber} reviews`}
      </Button>

      {/* Modal */}
      <Dialog open={open} onClose={toggleModal} maxWidth={'md'} fullScreen={mobileScreen}>
        <Stack
          sx={{
            px: { xs: 6, md: 8 },
            py: { xs: 2, md: 4 },
            borderBottom: '1px solid',
            borderColor: 'secondary2.light',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={toggleModal}
            sx={{ ml: { xs: 0, md: 'auto' }, mr: { xs: 'auto', md: 0 }, padding: 0 }}
          >
            {mobileScreen ? <KeyboardArrowLeftRoundedIcon fontSize="large" /> : <CloseIcon />}
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Stack
            sx={{
              px: 8,
              py: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="lg" fontWeight={600}>
              376 reviews
            </Typography>

            <FormControl>
              <Select
                value={selectedSort}
                onChange={handleChange}
                sx={{
                  '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select':
                    {
                      minHeight: 0,
                      py: 1,
                    },
                  'borderRadius': '2rem',
                }}
              >
                <MenuItem value={'recent'}>
                  <Typography variant={mobileScreen ? 'xs' : 'sm'}>Most Recent</Typography>
                </MenuItem>
                <MenuItem value={'rate'}>
                  <Typography variant={mobileScreen ? 'xs' : 'sm'}>Most Rated</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack gap={8} px={8} py={4}>
            {reviews.data.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  ) : (
    <Box>
      <Typography variant={mobileScreen ? 'lg' : 'xl'} fontWeight={600}>
        No reviews (yet)
      </Typography>
    </Box>
  );
};
