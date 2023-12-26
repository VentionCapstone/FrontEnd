import React, { useState, useEffect } from 'react';
import './AccommodationList.css';
import { Grid } from '@mui/material';
interface Accommodation {
  thumbnailUrl: string;
  description: string;
  price: number;
  availability: boolean;
}

const AccommodationList: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  useEffect(() => {
    // another: https://booking-api.ddns.net/api/accommodations?limit=12&page=1&minPrice=0&maxPrice=2147483647&minRooms=0&maxRooms=100&minPeople=0&maxPeople=500
    fetch('https://booking-api.ddns.net/api/accommodations')
      .then((response) => response.json())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      .then((data) => setAccommodations(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="">
      <h1>Accommodation List</h1>
      <Grid spacing={2} container>
        {accommodations.map((accommodation, index) => (
          <Grid key={index} lg={3} md={4} sm={12}>
            <div className="house-card">
              <img
                src={
                  accommodation.thumbnailUrl ||
                  'https://www28.cs.kobe-u.ac.jp/wp-content/uploads/2021/04/noimage.png'
                }
                alt="Accommodation Thumbnail"
                className="house-image"
              />
              <p>
                <strong>Description:</strong> {accommodation.description}
              </p>
              <p>
                <strong>Price:</strong> ${accommodation.price}
              </p>
              <p>
                <strong>Availability:</strong>{' '}
                {accommodation.availability ? 'Available' : 'Not Available'}
              </p>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AccommodationList;
