import { useState } from 'react';

import { Box, Typography } from '@mui/material';
import AccommodationForm from './components/AccommodationForm';
import UploadMedia from './components/UploadMedia';

function CreateAccommodation() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <Box>
      <Typography variant="lg" textAlign="center" pb={4}>
        Create Accommodation
      </Typography>
      {currentStep == 1 && <AccommodationForm setCurrentStep={setCurrentStep} />}
      {currentStep == 2 && <UploadMedia />}
      {currentStep == 3 && <div>Step 3</div>}
    </Box>
  );
}

export default CreateAccommodation;
