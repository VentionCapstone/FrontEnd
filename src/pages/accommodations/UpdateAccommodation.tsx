import { Box } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import { useGetHostedAccommodation } from '@src/api/queries/accommodations/useGetHostedAccommodtion';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';

import { ACCOMMODATION_STEPS } from '@src/constants';
import EditAmenities from '../accomodation/components/EditAmenities';
import AccommodationForm from './components/AccommodationForm';
import UpdateMedia from './components/UpdateMedia';

function UpdateAccommodation() {
  const { id } = useParams();
  const { data: accommodation, isError, isPending } = useGetHostedAccommodation({ id });

  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = searchParams.get('currentStep') || ACCOMMODATION_STEPS.accommodationForm;
  const accommodationId = searchParams.get('accommodationId') || '';

  const handleSearchParamsChange = (params: URLSearchParams) => {
    setSearchParams(params);
  };

  if (isPending) {
    return <LoadingPrimary />;
  }

  if (isError) {
    return <DataFetchError />;
  }

  return (
    <Box>
      {currentStep == ACCOMMODATION_STEPS.accommodationForm && (
        <AccommodationForm
          handleSearchParamsChange={handleSearchParamsChange}
          accommodation={accommodation.data}
          isNew={false}
        />
      )}
      {currentStep == ACCOMMODATION_STEPS.media && (
        <UpdateMedia
          accommodationId={accommodationId}
          handleSearchParamsChange={handleSearchParamsChange}
          media={accommodation.data.media}
        />
      )}
      {currentStep == ACCOMMODATION_STEPS.amenities && (
        <EditAmenities
          accommodationId={accommodationId}
          isNew={false}
          accommodationAmenities={accommodation.data.amenities}
        />
      )}
    </Box>
  );
}

export default UpdateAccommodation;
