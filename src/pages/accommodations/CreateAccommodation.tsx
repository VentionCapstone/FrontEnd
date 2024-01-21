import { useState } from 'react';

import { Box } from '@mui/material';
import AccommodationForm from './components/AccommodationForm';
import UploadMedia from './components/UploadMedia';

function CreateAccommodation() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [accommodationId, setAccommodationId] = useState<string>('');

  return (
    <Box>
      {currentStep == 1 && (
        <AccommodationForm
          setCurrentStep={setCurrentStep}
          setAccommodationId={setAccommodationId}
        />
      )}
      {currentStep == 2 && (
        <UploadMedia accommodationId={accommodationId} setCurrentStep={setCurrentStep} />
      )}
      {currentStep == 3 && <div>Step 3</div>}
    </Box>
  );
}

export default CreateAccommodation;
