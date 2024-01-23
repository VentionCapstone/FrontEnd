import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Slider from '@src/components/shared/Slider';
import { DATE_MONTH_YEAR_FORMAT } from '@src/constants';
import { FONT_SIZES } from '@src/theme/themeTokens';
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
    <Box
      sx={{
        py: '2.5rem',
      }}
    >
      <Box display={'flex'}>
        <Typography variant="h3" fontSize="1.6rem" fontWeight="800" mb={4} flex={1}>
          {t('host.reviews.title', { firstName })}
        </Typography>
        <Box>
          <IconButton onClick={handleBack} disabled={activeStep === 0} color="primary">
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={handleNext} disabled={activeStep === maxSteps - 1} color="primary">
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
      <Box>
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
            <Box
              key={review.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 5,
                border: '1px solid #b0b0b0',
                p: 3,
              }}
            >
              <Box textOverflow={'ellipsis'} height="9rem" mb={4} overflow="auto">
                <Typography flex={1} fontSize="1.1rem">
                  {review.feedback}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <Box
                  component={'img'}
                  src={review.user.profile.imageUrl}
                  sx={{ width: 50, height: 50, borderRadius: '50%' }}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body1" fontSize={FONT_SIZES.md} fontWeight="400">
                    {review.user.firstName} {review.user.lastName}
                  </Typography>
                  <Typography variant="body2" fontSize="1rem" fontWeight="400">
                    {dayjs(joinedAt).format(DATE_MONTH_YEAR_FORMAT)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default HostReviews;
