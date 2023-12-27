import './AccommodationList.css';
import { Box, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import httpClient from '../../api/httpClient';
import ErrorImage from '../../assets/no-image.png';
import { AccommodationHostingResponse } from '../../types/accommodation.types';
import LoadingPrimary from '../../components/loader/LoadingPrimary';
import DataFetchError from '../../components/shared/DataFetchError';

const AccommodationList: React.FC = () => {
  const {
    isPending,
    data: accommodations,
    isError,
  } = useQuery({
    queryKey: ['accommodations-hosting'],
    queryFn: async () => {
      const { data } = await httpClient.get<AccommodationHostingResponse>('accommodations/getAll');
      return data;
    },
  });

  const handleErrorInImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ErrorImage;
    e.currentTarget.style.objectFit = 'contain';
  };

  if (isPending) {
    return (
      <Box>
        <LoadingPrimary />
      </Box>
    );
  }
  if (isError) {
    return <DataFetchError error="Failed to get accommodation list" />;
  }

  return (
    <>
      <Grid spacing={2} container>
        {accommodations.data.map((accommodation) => (
          <Grid item key={accommodation.id} lg={3} md={4} sm={12}>
            <Box className="house-card" p={2}>
              <img
                src={accommodation.thumbnailUrl}
                onError={handleErrorInImage}
                alt="Accommodation Thumbnail"
                className="house-image"
              />
              <Typography fontWeight={600} mt={2}>
                {accommodation.address?.city}, {accommodation.address?.country}
              </Typography>
              <Typography fontWeight={600} mt={2}>
                ${accommodation.price}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AccommodationList;
