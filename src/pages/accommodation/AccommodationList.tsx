import React, { useState, useEffect } from 'react';
import './AccommodationList.css';
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
      {accommodations.map((accommodation, index) => (
        <div
          key={index}
          // style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}
          className="house-card"
        >
          <img
            src={accommodation.thumbnailUrl}
            alt="Accommodation Thumbnail"
            // style={{ maxWidth: '100px' }}
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
      ))}
    </div>
  );
};

export default AccommodationList;
