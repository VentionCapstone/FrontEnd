import { Box } from '@mui/system';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import httpClient from '../../api/httpClient';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import { AccommodationResponse } from '../../types/accommodation.types';
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { buildAmenityList } from './utils/amenityListBuilder';
import { AmenitySetting } from '../../types/amenity.types';

function Accommodation() {
  const accommodationId = useParams().id;
  const [amenities, setAmenities] = useState<AmenitySetting[]>([]);

  const { isPending, data, isError } = useQuery({
    queryKey: ['accommodation', accommodationId],
    queryFn: async () => {
      const { data } = await httpClient.get<AccommodationResponse>(
        `/accommodations/${accommodationId}`
      );
      return data.data;
    },
  });

  useEffect(() => {
    function selectOnlyTrueAmenities() {
      if (data?.amenities) {
        const { id, accommodationId, otherAmenities, ...rest } = data?.amenities[0] ?? {};
        const trueAmenities = Object.entries(rest)
          .filter(([, value]) => value === true)
          .map(([key]) => key);
        setAmenities(buildAmenityList(trueAmenities));
        console.log(id, accommodationId, otherAmenities);
      }
    }
    selectOnlyTrueAmenities();
  }, [data]);

  if (isPending) {
    return (
      <Box>
        <LoadingPrimary />
      </Box>
    );
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <Box>
      <Box>
        {data.media.slice(0, 1).map((media) => (
          <Grid key={media.id}>
            <img src={media.imageUrl} alt={media.accommodationId} />
          </Grid>
        ))}
      </Box>
      <Box marginTop={4}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.3rem',
            marginBottom: '1rem',
          }}
        >
          {data.description}
        </Typography>
        <Box display={'flex'} gap={1}>
          <Typography>{data.allowedNumberOfPeople} Guests -</Typography>
          <Typography> {data.numberOfRooms} Rooms -</Typography>
          <Typography>{data.squareMeters} Square meters</Typography>
        </Box>
      </Box>
      <Box marginY={4}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.3rem',
            marginBottom: '1rem',
          }}
        >
          What this place offers
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '50%',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          {amenities.map((amenity) => (
            <Box key={amenity.id} sx={{ display: 'flex', gap: 4, width: '48%' }}>
              <Box>{amenity.icon}</Box>
              <Typography>{amenity.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Accommodation;
