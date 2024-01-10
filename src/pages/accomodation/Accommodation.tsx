import { Box } from '@mui/system';
import { useParams } from 'react-router';
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Reviews } from './components/Reviews';
import { styles } from './Accommodation.styles';
import AmenityList from './components/AmenityList';
import { AmenitySetting } from '../../types/amenity.types';
import { buildAmenityList } from './utils/amenityListBuilder';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import DataFetchError from '../../components/shared/DataFetchError';
import { handleErrorInImage, selectOnlyTrueAmenities } from '../../utils';
import useGetSingleAccommodationQuery from '../../api/queries/accommodation/useGetSingleAccommodationQuery';

function Accommodation() {
  const accommodationId = useParams().id;
  const [amenities, setAmenities] = useState<AmenitySetting[]>([]);

  const { isPending, data, isError } = useGetSingleAccommodationQuery(accommodationId as string);

  useEffect(() => {
    if (data?.amenities) {
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
    return <DataFetchError error="Failed to get single accommodation" position="center" />;
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
            <Typography sx={styles.heading}>{data.description}</Typography>
            <Box display={'flex'} gap={1} flexWrap={'wrap'}>
              <Typography>{data.allowedNumberOfPeople} Guests -</Typography>
              <Typography> {data.numberOfRooms} Rooms -</Typography>
              <Typography>{data.squareMeters} Square meters</Typography>
            </Box>
          </Box>
          <AmenityList amenities={amenities} />
        </Box>
        <Box flex={0.4}></Box>
      </Box>
      <Reviews accommodationId={accommodationId || ''} />
    </Box>
  );
}

export default Accommodation;
