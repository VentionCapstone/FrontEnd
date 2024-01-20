import { useState } from 'react';

import { Box } from '@mui/material';
import AccommodationForm from './AccommodationForm';

function CreateAccommodation() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Box>
      {currentStep == 1 && <AccommodationForm setCurrentStep={setCurrentStep} />}
      {currentStep == 2 && <div>Step 2</div>}
    </Box>
  );
}

export default CreateAccommodation;
