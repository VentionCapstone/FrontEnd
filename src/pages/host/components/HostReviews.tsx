import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Slider from '@src/components/shared/Slider';
import { DATE_MONTH_YEAR_FORMAT } from '@src/constants';
import { HostProfile } from '@src/types/hostProfile.types';
import { HostInfo } from '@src/types/i18n.types';

function HostReviews({ host }: { host: HostProfile }) {
  const { t } = useTranslation();
  const { firstName, joinedAt, reviews } = host;
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up('md'));
  const itemsPerView = match ? 2 : 1;
  const maxSteps = reviews.list ? Math.ceil(reviews.list.length / itemsPerView) : 1;
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'} mb={4}>
        <Typography variant="lg" fontWeight="600" mr={'auto'}>
          {t('host.reviews.title', { firstName })}
        </Typography>

        <Box flexShrink={0}>
          <IconButton onClick={handleBack} disabled={activeStep === 0} color="primary">
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={handleNext} disabled={activeStep === maxSteps - 1} color="primary">
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>

      <Slider
        itemsPerView={itemsPerView}
        activeStep={activeStep}
        onStepChange={setActiveStep}
        maxSteps={maxSteps}
        onEmpty={
          <Typography key="error" textAlign="center">
            {t(HostInfo.host_reviews_empty)}
          </Typography>
        }
      >
        {reviews.list?.map((review) => (
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
        ))}
      </Slider>
    </Box>
  );
}

export default HostReviews;
