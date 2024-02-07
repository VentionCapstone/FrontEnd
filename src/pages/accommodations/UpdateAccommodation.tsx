import { Box } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import { useGetHostedAccommodation } from '@src/api/queries/accommodations/useGetHostedAccommodtion';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';

import { AccommodationSteps } from '@src/types/global.types';
import EditAmenities from '../accomodation/components/EditAmenities';
import AccommodationForm from './components/AccommodationForm';
import UpdateMedia from './components/UpdateMedia';

function UpdateAccommodation() {
  const { id } = useParams();
  const { data: accommodation, isError, isPending } = useGetHostedAccommodation({ id });

  const [searchParams, setSearchParams] = useSearchParams();

  const currentStepRaw = searchParams.get('currentStep');
  const currentStep = currentStepRaw
    ? (currentStepRaw as unknown as AccommodationSteps)
    : AccommodationSteps.accommodationForm;
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
      {currentStep == AccommodationSteps.accommodationForm && (
        <AccommodationForm
          handleSearchParamsChange={handleSearchParamsChange}
          accommodation={accommodation.data}
          isNew={false}
        />
      )}
      {currentStep == AccommodationSteps.media && (
        <UpdateMedia
          accommodationId={accommodationId}
          handleSearchParamsChange={handleSearchParamsChange}
          media={accommodation.data.media}
        />
      )}
      {currentStep == AccommodationSteps.amenities && (
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
