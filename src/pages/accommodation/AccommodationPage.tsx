import React, { useState } from 'react';
import { Button, TextField, Container, Grid } from '@mui/material';

// Interfaces
interface FormInput {
  accommodation: {
    thumbnailUrl: string;
    previewImgUrl: string;
    squareMeters: number;
    numberOfRooms: number;
    price: number;
    availability: boolean;
    availableFrom: string;
    availableTo: string;
    description: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormInput>({
    accommodation: {
      thumbnailUrl: '',
      previewImgUrl: '',
      squareMeters: 0,
      numberOfRooms: 0,
      price: 0,
      availability: true,
      availableFrom: '',
      availableTo: '',
      description: '',
    },
    address: {
      street: '',
      city: '',
      country: '',
      zipCode: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          accommodation: {
            ...prevData.accommodation,
            previewImgUrl: reader.result as string,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    section: 'accommodation' | 'address',
    key: string,
    value: string | number | boolean
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value,
      },
    }));
  };

  const handleSubmit = () => {
    console.log('Sending data to backend:', formData);
  };

  return (
    <Container>
      <form>
        <Grid container spacing={1}>
          {/* Accommodation Section */}
          <h2 style={{ marginLeft: 10 }}>Accommodation</h2>
          <Grid item xs={12}>
            <TextField
              label="Thumbnail URL"
              fullWidth
              value={formData.accommodation.thumbnailUrl}
              onChange={(e) => handleChange('accommodation', 'thumbnailUrl', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="PreviewImg URL"
              fullWidth
              value={formData.accommodation.previewImgUrl}
              onChange={(e) => handleChange('accommodation', 'previewImgUrl', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Square Meters"
              type="string"
              fullWidth
              value={formData.accommodation.squareMeters}
              onChange={(e) =>
                handleChange('accommodation', 'squareMeters', Number(e.target.value))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Rooms"
              type="string"
              fullWidth
              value={formData.accommodation.numberOfRooms}
              onChange={(e) =>
                handleChange('accommodation', 'numberOfRooms', Number(e.target.value))
              }
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Price"
              type="string"
              fullWidth
              value={formData.accommodation.price}
              onChange={(e) => handleChange('accommodation', 'price', Number(e.target.value))}
            />
          </Grid>

          {/* availability */}
          <Grid item xs={12}>
            <div>
              <label>Availability:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={formData.accommodation.availability === true}
                    onChange={() => handleChange('accommodation', 'availability', true)}
                  />
                  Available
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={formData.accommodation.availability === false}
                    onChange={() => handleChange('accommodation', 'availability', false)}
                  />
                  Not Available
                </label>
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Available From"
              type="datetime-local"
              fullWidth
              value={formData.accommodation.availableFrom}
              onChange={(e) => handleChange('accommodation', 'availableFrom', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Available To"
              type="datetime-local"
              fullWidth
              value={formData.accommodation.availableTo}
              onChange={(e) => handleChange('accommodation', 'availableTo', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              value={formData.accommodation.description}
              onChange={(e) => handleChange('accommodation', 'description', e.target.value)}
            />
          </Grid>

          <h2 style={{ marginLeft: 10 }}>Address</h2>
          {/* Address Section */}
          <Grid item xs={12}>
            <TextField
              label="Street"
              fullWidth
              value={formData.address.street}
              onChange={(e) => handleChange('address', 'street', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City"
              fullWidth
              value={formData.address.city}
              onChange={(e) => handleChange('address', 'city', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Country"
              fullWidth
              value={formData.address.country}
              onChange={(e) => handleChange('address', 'country', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Zip Code"
              fullWidth
              value={formData.address.zipCode}
              onChange={(e) => handleChange('address', 'zipCode', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Latitude"
              type="text"
              fullWidth
              value={formData.address.latitude}
              onChange={(e) => handleChange('address', 'latitude', Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Longitude"
              type="text"
              fullWidth
              value={formData.address.longitude}
              onChange={(e) => handleChange('address', 'longitude', Number(e.target.value))}
            />
          </Grid>

          {/* Upload Image */}
          <Grid item xs={12}>
            {/* Input for image upload */}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MyForm;
