import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, IconButton, Rating, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CustomImage from '@src/components/shared/CustomImage';
import Slider from '@src/components/shared/Slider';
import { ROUTES } from '@src/config/routes.config';
import { HostProfile } from '@src/types/hostProfile.types';
import { HostInfo } from '@src/types/i18n.types';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function HostListings({ host }: { host: HostProfile }) {
  const { t } = useTranslation();
  const { firstName, accommodations } = host;
  const theme = useTheme();
  const isLargeMd = useMediaQuery(theme.breakpoints.up('md'));
  const isLargeSm = useMediaQuery(theme.breakpoints.up('sm'));
  const itemsPerView = isLargeMd ? 3 : isLargeSm ? 2 : 1;

  const [sliderAccommodations] = useState(accommodations?.slice(0, 12));
  const [activeStep, setActiveStep] = useState<number>(0);
  const maxSteps = sliderAccommodations ? Math.ceil(sliderAccommodations.length / itemsPerView) : 1;

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
          {t(HostInfo.host_listings_title, { firstName })}
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

      <Box>
        <Slider
          itemsPerView={itemsPerView}
          activeStep={activeStep}
          onStepChange={setActiveStep}
          maxSteps={maxSteps}
          onEmpty={
            <Typography key="error" textAlign="center">
              {t(HostInfo.host_listings_empty)}
            </Typography>
          }
        >
          {sliderAccommodations?.map((accommodation) => (
            <Link
              key={accommodation.id}
              to={ROUTES.accommodations.details(accommodation.id)}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  height: '22rem',
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    height: '15rem',
                    borderRadius: 3,
                  }}
                >
                  <CustomImage
                    image={accommodation.previewImgUrl}
                    name="accommodation preview image"
                  />
                </Box>

                <Stack mt={4} gap={1}>
                  <Typography
                    sx={{
                      WebkitLineClamp: 1,
                      display: '-webkit-box',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {accommodation.title}
                  </Typography>

                  <Rating
                    name="read-only"
                    size="small"
                    value={accommodation.rating}
                    precision={0.5}
                    readOnly
                    sx={{ color: 'secondary.main' }}
                  />
                </Stack>
              </Box>
            </Link>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default HostListings;
