import { Box } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import { useGetHostedAccommodation } from '@src/api/queries/accommodations/useGetHostedAccommodtion';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';
import EditAmenities from '../accomodation/components/EditAmenities';
import AccommodationForm from './components/AccommodationForm';
import UploadMedia from './components/UploadMedia';

function UpdateAccommodation() {
  const { id } = useParams();
  const { data: accommodation, isError, isPending } = useGetHostedAccommodation({ id });

  const [searchParams, setSearchParams] = useSearchParams();

  const currentStep = Number(searchParams.get('currentStep')) || 1;
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
      {currentStep == 1 && (
        <AccommodationForm
          handleSearchParamsChange={handleSearchParamsChange}
          accommodation={accommodation.data}
          isNew={false}
        />
      )}
      {currentStep == 2 && (
        <UploadMedia
          accommodationId={accommodationId}
          handleSearchParamsChange={handleSearchParamsChange}
        />
      )}
      {currentStep == 3 && (
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
