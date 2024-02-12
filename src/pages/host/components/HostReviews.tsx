import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Slider from '@src/components/shared/Slider';
import { HostProfile } from '@src/types/hostProfile.types';
import { HostInfo } from '@src/types/i18n.types';
import ReviewListItem from './ReviewListItem';

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
          <ReviewListItem review={review} joinedAt={joinedAt} key={review.id} />
        ))}
      </Slider>
    </Box>
  );
}

export default HostReviews;
