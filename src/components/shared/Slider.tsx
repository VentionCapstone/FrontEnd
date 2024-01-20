import { Box } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

interface SliderProps {
  children: JSX.Element[];
  itemsPerView: number;
  onStepChange: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
  maxSteps: number;
  showIndicators?: boolean;
}

function Slider({
  children,
  itemsPerView,
  onStepChange,
  activeStep,
  maxSteps,
  showIndicators = false,
}: SliderProps) {
  const handleStepChange = (now?: number) => {
    onStepChange(now || 0);
  };

  return (
    <Box>
      <Carousel
        navButtonsAlwaysInvisible
        index={activeStep}
        autoPlay={false}
        animation="slide"
        onChange={handleStepChange}
        indicators={showIndicators}
      >
        {Array.from({ length: maxSteps }).map((_, index) => {
          return (
            <Box
              key={`step-${index}`}
              sx={{
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'space-evenly',
              }}
            >
              {children
                .slice(index * itemsPerView, index * itemsPerView + itemsPerView)
                .map((child, childIndex) => {
                  return (
                    <Box sx={{ mx: 1, flex: 1 }} key={`step-${index}-${childIndex}`}>
                      {React.cloneElement(child, {})}
                    </Box>
                  );
                })}
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
}

export default Slider;
