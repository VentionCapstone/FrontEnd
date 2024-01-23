import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import useGetSingleAccommodationQuery from '@src/api/queries/accommodation/useGetSingleAccommodationQuery';
import BookingForm from '@src/components/booking/BookingForm';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import DataFetchError from '@src/components/shared/DataFetchError';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { ROUTES } from '@src/config/routes.config';
import { AmenitySetting } from '@src/types/amenity.types';
import { ErrorTypes } from '@src/types/i18n.types';
import { getValueFromLocalStorage, handleErrorInImage, selectOnlyTrueAmenities } from '@src/utils';
import YandexMap from '../../components/shared/YandexMap';
import { styles } from './Accommodation.styles';
import AmenityList from './components/AmenityList';
import OwnerCard from './components/OwnerCard';
import { Reviews } from './components/Reviews';
import { buildAmenityList } from './utils/amenityListBuilder';

function Accommodation() {
  const { id: accommodationId } = useParams();

  const [amenities, setAmenities] = useState<AmenitySetting[]>([]);

  const ownerId = getValueFromLocalStorage<string>(LOCAL_STORAGE_KEYS.sub);

  const { isPending, data, isError } = useGetSingleAccommodationQuery(accommodationId as string);

  const navigate = useNavigate();

  const handleEditClick = (id: string) => {
    navigate(ROUTES.accommodations.edit(id));
  };

  useEffect(() => {
    if (data?.amenities && data?.amenities[0]) {
      const listOfTrueAmenities = selectOnlyTrueAmenities(data?.amenities[0]);

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

  const [image_1, image_2, image_3, image_4, image_5] = data.media;

  return (
    <Box>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={6} flex={1} sx={styles.image_left}>
          <img src={image_1.imageUrl} alt={image_1.accommodationId} onError={handleErrorInImage} />
        </Grid>
        <Grid item container spacing={2} flex={1} sx={styles.image_list}>
          <Grid item md={6}>
            <img
              src={image_2.imageUrl}
              alt={image_2.accommodationId}
              onError={handleErrorInImage}
            />
          </Grid>
          <Grid item md={6} sx={styles.image_right_top}>
            <img
              src={image_3.imageUrl}
              alt={image_3.accommodationId}
              onError={handleErrorInImage}
            />
          </Grid>
          <Grid item md={6}>
            <img
              src={image_4.imageUrl}
              alt={image_4.accommodationId}
              onError={handleErrorInImage}
            />
          </Grid>
          <Grid item md={6} sx={styles.image_right_bottom}>
            <img
              src={image_5.imageUrl}
              alt={image_5.accommodationId}
              onError={handleErrorInImage}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box sx={styles.content}>
        <Box flex={0.6}>
          <Box>
            <Typography sx={styles.heading}>{data.title}</Typography>
            <Box display={'flex'} gap={1} flexWrap={'wrap'}>
              <Typography>{data.allowedNumberOfPeople} Guests -</Typography>
              <Typography> {data.numberOfRooms} Rooms -</Typography>
              <Typography>{data.squareMeters} Square meters</Typography>
            </Box>
            <Typography mt={2}>{data?.description}</Typography>
          </Box>

          <AmenityList amenities={amenities} />
        </Box>
        <Box flex={0.4}>
          {ownerId === data.ownerId ? (
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
                  'color': 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
                onClick={() => handleEditClick(data.id)}
              >
                Edit Accommodation
              </Button>
            </Box>
          ) : (
            <>
              <BookingForm accomodationId={accommodationId} price={data.price} />
              <OwnerCard owner={data.owner} />
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
