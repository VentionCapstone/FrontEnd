import React, { useState } from 'react';
import { Button, TextField, Container, Grid } from '@mui/material';
import httpClient from '../../api/httpClient';
import { CreateAccommodationResponse, FormInput } from '../../types/accommodation.types';

const CreateAccommodation: React.FC = (): JSX.Element => {
  const [createdAccommodation, setCreatedAccommodation] = useState(false);
  const [accommodationId, setAccommodationId] = useState('');
  const [inputFile, setInputFile] = useState<Blob | string>('');
  const [formData, setFormData] = useState<FormInput>({
    accommodation: {
      thumbnailUrl: '',
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

  const handleSubmit = async () => {
    try {
      if (createdAccommodation) {
        const imageFormData = new FormData();
        imageFormData.append('file', inputFile);

        const data = await httpClient.post('accommodation/file/' + accommodationId, imageFormData);
        console.log(data);
      } else {
        const { data } = await httpClient.post<CreateAccommodationResponse>(
          'accommodation/create',
          formData
        );
        setAccommodationId(data.data.id);
        setCreatedAccommodation(true);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const blob = await dataURLtoBlob(reader.result as string);
        setInputFile(blob);
      };

      reader.readAsDataURL(file);
    }
  };

  const dataURLtoBlob = async (dataURL: string) => {
    const response = await fetch(dataURL);
    const blob = await response.blob();
    return blob;
  };

  return (
    <Container>
      <form>
        <Grid container spacing={3}>
          {/* Accommodation Section */}
          {!createdAccommodation && (
            <>
              <h2 style={{ marginLeft: 10 }}>Accommodation</h2>
              <Grid item xs={10}>
                <TextField
                  label="Thumbnail URL"
                  fullWidth
                  value={formData.accommodation.thumbnailUrl}
                  onChange={(e) => handleChange('accommodation', 'thumbnailUrl', e.target.value)}
                />
              </Grid>
              <Grid style={{ marginLeft: 5, marginTop: 10 }} container spacing={2}>
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Price"
                    type="string"
                    fullWidth
                    value={formData.accommodation.price}
                    onChange={(e) => handleChange('accommodation', 'price', Number(e.target.value))}
                  />
                </Grid>
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
              <Grid item xs={3}>
                <h3>Available From</h3>
                <TextField
                  type="date"
                  fullWidth
                  value={formData.accommodation.availableFrom}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    handleChange('accommodation', 'availableFrom', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <h3>Available To</h3>
                <TextField
                  // label="Available To"
                  type="date"
                  fullWidth
                  value={formData.accommodation.availableTo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    handleChange('accommodation', 'availableTo', e.target.value)
                  }
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
            </>
          )}

          {createdAccommodation && (
            <Grid item xs={12}>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => void handleSubmit()}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateAccommodation;
