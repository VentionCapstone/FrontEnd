import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { ACCOMMODATION_STEPS } from '@src/constants';
import EditAmenities from '../accomodation/components/EditAmenities';
import AccommodationForm from './components/AccommodationForm';
import AddMedia from './components/AddMedia';

function CreateAccommodation() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = searchParams.get('currentStep') || ACCOMMODATION_STEPS.accommodationForm;
  const accommodationId = searchParams.get('accommodationId') || '';

  const handleSearchParamsChange = (params: URLSearchParams) => {
    setSearchParams(params);
  };

  return (
    <Box>
      {currentStep == ACCOMMODATION_STEPS.accommodationForm && (
        <AccommodationForm handleSearchParamsChange={handleSearchParamsChange} isNew={true} />
      )}
      {currentStep == ACCOMMODATION_STEPS.media && (
        <AddMedia
          accommodationId={accommodationId}
          handleSearchParamsChange={handleSearchParamsChange}
        />
      )}
      {currentStep == ACCOMMODATION_STEPS.amenities && (
        <EditAmenities accommodationId={accommodationId} isNew={true} />
      )}
    </Box>
  );
}

export default CreateAccommodation;
