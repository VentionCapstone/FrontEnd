import { Box } from '@mui/system';
import { useParams } from 'react-router';
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import httpClient from '../../api/httpClient';
import { AmenitySetting } from '../../types/amenity.types';
import { buildAmenityList } from './utils/amenityListBuilder';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import { AccommodationResponse } from '../../types/accommodations.types';

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
        const trueAmenities = Object.entries(data.amenities[0])
          .filter(([, value]) => value === true)
          .map(([key]) => key);
        setAmenities(buildAmenityList(trueAmenities));
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

  const [image_1, image_2, image_3, image_4, image_5] = data.media;

  return (
    <Box>
      <Grid
        container
        columnSpacing={2}
        sx={{
          borderRadius: '10px',
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          flex={1}
          sx={{
            '& img': {
              width: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: '15px',
              borderBottomLeftRadius: '15px',
              borderTopRightRadius: {
                xs: '15px',
                md: '0',
              },
              borderBottomRightRadius: {
                xs: '15px',
                md: '0',
              },
              height: {
                'md': '408px',
                'lg': '458px',
                'xl': '558px',
                '2xl': '608px',
              },
            },
          }}
        >
          <img src={image_1.imageUrl} alt={image_1.accommodationId} />
        </Grid>
        <Grid
          item
          container
          spacing={2}
          flex={1}
          sx={{
            'display': {
              xs: 'none',
              md: 'flex',
            },
            '& img': {
              width: '100%',
              objectFit: 'cover',
              height: {
                'md': '200px',
                'lg': '225px',
                'xl': '275px',
                '2xl': '300px',
              },
            },
          }}
        >
          <Grid item md={6}>
            <img src={image_2.imageUrl} alt={image_2.accommodationId} />
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              '& img': {
                borderTopRightRadius: '15px',
              },
            }}
          >
            <img src={image_3.imageUrl} alt={image_3.accommodationId} />
          </Grid>
          <Grid item md={6}>
            <img src={image_4.imageUrl} alt={image_4.accommodationId} />
          </Grid>
          <Grid
            item
            md={6}
            sx={{
              '& img': {
                borderBottomRightRadius: '15px',
              },
            }}
          >
            <img src={image_5.imageUrl} alt={image_5.accommodationId} />
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 3,
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          mt: 7,
        }}
      >
        <Box flex={0.6}>
          <Box>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '1.3rem',
                marginBottom: '1rem',
              }}
            >
              {data.description}
            </Typography>
            <Box display={'flex'} gap={1} flexWrap={'wrap'}>
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
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {amenities.map((amenity) => (
                <Box
                  key={amenity.id}
                  sx={{ display: 'flex', gap: 4, width: '48%', alignItems: 'center' }}
                >
                  <Box>{amenity.icon}</Box>
                  <Typography>{amenity.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box flex={0.4}>
          <Typography>Hi</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Accommodation;
