import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { AccommodationSteps } from '@src/types/global.types';
import EditAmenities from '../accomodation/components/EditAmenities';
import AccommodationForm from './components/AccommodationForm';
import AddMedia from './components/AddMedia';

function CreateAccommodation() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStepRaw = searchParams.get('currentStep');
  const currentStep = currentStepRaw
    ? (currentStepRaw as unknown as AccommodationSteps)
    : AccommodationSteps.accommodationForm;
  const accommodationId = searchParams.get('accommodationId') || '';

  const handleSearchParamsChange = (params: URLSearchParams) => {
    setSearchParams(params);
  };

  return (
    <Box>
      {currentStep == AccommodationSteps.accommodationForm && (
        <AccommodationForm handleSearchParamsChange={handleSearchParamsChange} isNew={true} />
      )}
      {currentStep == AccommodationSteps.media && (
        <AddMedia
          accommodationId={accommodationId}
          handleSearchParamsChange={handleSearchParamsChange}
        />
      )}
      {currentStep == AccommodationSteps.amenities && (
        <EditAmenities accommodationId={accommodationId} isNew={true} />
      )}
    </Box>
  );
}

export default CreateAccommodation;
