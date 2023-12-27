import { Box } from '@mui/system';
import { useParams } from 'react-router';
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AmenitySetting } from '../../types/amenity.types';
import ErrorImage from '../../assets/no-image.png';
import { Amenity } from '../../types/accommodations.types';
import { buildAmenityList } from './utils/amenityListBuilder';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import useGetSingleAccommodationQuery from '../../api/queries/accommodation/useGetSingleAccommodationQuery';
import { Reviews } from './components/Reviews';
import DataFetchError from '../../components/shared/DataFetchError';

function selectOnlyTrueAmenities(amenities: Amenity) {
  const trueAmenities = Object.entries(amenities)
    .filter(([, value]) => value === true)
    .map(([key]) => key);

  return trueAmenities;
}

const handleErrorInImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = ErrorImage;
  e.currentTarget.style.objectFit = 'contain';
};

function Accommodation() {
  const accommodationId = useParams().id;
  const [amenities, setAmenities] = useState<AmenitySetting[]>([]);

  const { isPending, data, isError } = useGetSingleAccommodationQuery(accommodationId as string);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [accommodationId]);

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
    return <DataFetchError />;
  }

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
                'xs': '310px',
                'sm': '360px',
                'md': '408px',
                'lg': '458px',
                'xl': '558px',
                '2xl': '608px',
              },
            },
          }}
        >
          <img
            src={data.media[0]?.imageUrl}
            alt={data.media[0].accommodationId}
            onError={handleErrorInImage}
          />
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
            <img
              src={data.media[1]?.imageUrl}
              alt={data.media[1].accommodationId}
              onError={handleErrorInImage}
            />
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
            <img
              src={data.media[2]?.imageUrl}
              alt={data.media[2].accommodationId}
              onError={handleErrorInImage}
            />
          </Grid>
          <Grid item md={6}>
            <img
              src={data.media[3]?.imageUrl}
              alt={data.media[3].accommodationId}
              onError={handleErrorInImage}
            />
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
            <img
              src={data.media[4]?.imageUrl}
              alt={data.media[4]?.accommodationId}
              onError={handleErrorInImage}
            />
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
                fontSize: {
                  xs: '1.1rem',
                  md: '1.3rem',
                },
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
                fontSize: {
                  xs: '1.1rem',
                  md: '1.3rem',
                },
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
      <Reviews accommodationId={accommodationId as string} />
    </Box>
  );
}

export default Accommodation;