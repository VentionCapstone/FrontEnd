import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import EditAmenities from '../accomodation/components/EditAmenities';
import AccommodationForm from './components/AccommodationForm';
import UploadMedia from './components/UploadMedia';

function CreateAccommodation() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = Number(searchParams.get('currentStep')) || 1;
  const accommodationId = searchParams.get('accommodationId') || '';

  const handleSearchParamsChange = (params: URLSearchParams) => {
    setSearchParams(params);
  };

  return (
    <Box>
      {currentStep == 1 && (
        <AccommodationForm handleSearchParamsChange={handleSearchParamsChange} isNew={true} />
      )}
      {currentStep == 2 && (
        <UploadMedia
          accommodationId={accommodationId}
          handleSearchParamsChange={handleSearchParamsChange}
        />
      )}
      {currentStep == 3 && <EditAmenities accommodationId={accommodationId} isNew={true} />}
    </Box>
  );
}

export default CreateAccommodation;
