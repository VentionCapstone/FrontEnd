import React, { useState, useEffect } from 'react';
import './AccommodationList.css';
import { Box, Grid, Typography } from '@mui/material';
interface Accommodation {
  thumbnailUrl: string;
  description: string;
  price: number;
  availability: boolean;
}

('https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg');

const AccommodationList: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  useEffect(() => {
    // another old: https://booking-api.ddns.net/api/accommodations?limit=12&page=1&minPrice=0&maxPrice=2147483647&minRooms=0&maxRooms=100&minPeople=0&maxPeople=500
    // other old2 :https://booking-api.ddns.net/api/accommodations

    fetch(
      'https://booking-vention.ddns.net/api/accommodations?limit=12&page=1&minPrice=0&maxPrice=2147483647&minRooms=0&maxRooms=100&minPeople=0&maxPeople=500'
    )
      .then((response) => response.json())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      .then((data) => setAccommodations(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleErrorInImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
    e.currentTarget.style.objectFit = 'contain';
  };
  return (
    <>
      <Typography variant="h3" p={2}>
        Accommodation List
      </Typography>
      <Grid spacing={2} container>
        {accommodations.map((accommodation, index) => (
          <Grid item key={index} lg={3} md={4} sm={12}>
            <Box className="house-card" p={2}>
              <img
                src={accommodation.thumbnailUrl}
                onError={handleErrorInImage}
                alt="Accommodation Thumbnail"
                className="house-image"
              />
              <Typography fontWeight={600}>Price:</Typography>${accommodation.price}
              <Typography fontWeight={600}>
                Description: {accommodation.availability ? 'Available' : 'Not Available'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AccommodationList;
