import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import useGetSingleAccommodationQuery from '@src/api/queries/accommodation/useGetSingleAccommodationQuery';
import BookingForm from '@src/components/booking/BookingForm';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { ROUTES } from '@src/config/routes.config';
import { AmenitySetting } from '@src/types/amenity.types';

import { EditAccommodation, ErrorTypes } from '@src/types/i18n.types';
import { getValueFromLocalStorage, selectOnlyTrueAmenities } from '@src/utils';
import YandexMap from '../../components/shared/YandexMap';
import { styles } from './Accommodation.styles';
import AmenityList from './components/AmenityList';
import ImagesList from './components/ImagesList';
import OwnerCard from './components/OwnerCard';
import { Reviews } from './components/Reviews';
import { buildAmenityList } from './utils/amenityListBuilder';

function Accommodation() {
  const { t } = useTranslation();
  const { id: accommodationId } = useParams();

  const [amenities, setAmenities] = useState<AmenitySetting[]>([]);

  const ownerId = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.sub)?.toString();

  const { isPending, data, isError } = useGetSingleAccommodationQuery(accommodationId as string);

  const navigate = useNavigate();

  const handleEditClick = (id: string) => {
    navigate(ROUTES.accommodations.edit(id));
  };

  useEffect(() => {
    if (data?.amenities) {
      const listOfTrueAmenities = selectOnlyTrueAmenities(data?.amenities);

      setAmenities(buildAmenityList(listOfTrueAmenities));
    }
  }, [data]);

  if (isPending) {
    return (
      <Box>
        <LoadingPrimary />
      </Box>
    );
  }

  if (isError) {
    return (
      <DataFetchError errorKey={ErrorTypes.accommodation_failed_to_get_single} position="center" />
    );
  }

  return (
    <Box>
      <ImagesList images={data.media} />

      <Box sx={styles.content}>
        <Box flex={0.6}>
          <Box>
            <Typography sx={styles.heading}>{data.title}</Typography>
            <Box display={'flex'} gap={1} flexWrap={'wrap'}>
              <Typography>
                {data.allowedNumberOfPeople} {t(EditAccommodation.Guests)} -
              </Typography>
              <Typography>
                {' '}
                {data.numberOfRooms} {t(EditAccommodation.Rooms)} -
              </Typography>
              <Typography>
                {data.squareMeters} {t(EditAccommodation.SqMeter)}
              </Typography>
            </Box>
            <Typography mt={2}>{data?.description}</Typography>
          </Box>

          <AmenityList amenities={amenities} />
        </Box>
        <Box flex={0.4}>
          {ownerId === data.ownerId ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    'backgroundColor': 'primary.main',
                    'fontWeight': 'bold',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                  onClick={() => handleEditClick(data.id)}
                >
                  {t(EditAccommodation.EditAccommodation)}
                </Button>
              </Box>
              <OwnerCard owner={data.owner} />
            </>
          ) : (
            <>
              <BookingForm accomodationId={accommodationId} price={data.price} />
            </>
          )}
        </Box>
      </Box>
      <Reviews accommodationId={accommodationId || ''} />
      <Box mt={'2rem'}>
        <YandexMap latitude={data.address.latitude} longitude={data.address.longitude} />
      </Box>
    </Box>
  );
}

export default Accommodation;
