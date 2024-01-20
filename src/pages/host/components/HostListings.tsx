import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, IconButton, Rating, Typography, useMediaQuery, useTheme } from '@mui/material';
import CustomImage from '@src/components/shared/CustomImage';
import Slider from '@src/components/shared/Slider';
import { ROUTES } from '@src/config/routes.config';
import { HostProfile } from '@src/types/hostProfile.types';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

function HostListings({ host }: { host: HostProfile }) {
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
    <Box
      sx={{
        py: '2.5rem',
      }}
    >
      <Box display={'flex'}>
        <Typography variant="h3" fontSize="1.6rem" fontWeight="800" mb={4} flex={1}>
          {firstName}&apos;s latest reviews
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
              This host has no active accommodations.
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
                  flex: '1',
                  height: '22rem',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    height: '15rem',
                    borderRadius: 3,
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <CustomImage
                    image={accommodation.previewImgUrl}
                    name="accommodation preview image"
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    mt: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontSize="1rem"
                    fontWeight="500"
                    height={'3.2rem'}
                    sx={{ mb: 1 }}
                    // hidden
                    overflow={'hidden'}
                  >
                    {accommodation.title}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={accommodation.rating}
                    precision={0.5}
                    readOnly
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
            </Link>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default HostListings;
