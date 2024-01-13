import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useCreateAccommodation } from '@src/api/mutations/accommodations/useCreateAccommodation';
import { useDeleteAccommodation } from '@src/api/mutations/accommodations/useDeleteAccommodation';
import { useUpdateAccommodation } from '@src/api/mutations/accommodations/useUpdateAccommodation';
import { useGetAccommodation } from '@src/api/queries/accommodations/useGetAccommodation';
import YandexMap from '@src/components/YandexMap';
import { ROUTES } from '@src/config/routes.config';
import { AccommodationReq, accommodationSchema } from '@src/types/accommodation.types';
import { Coordinates } from '@src/types/global.types';
import { FormDateField } from './FormDateField';
import { FormField } from './FormField';

export default function AccommodationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: accommodation } = useGetAccommodation({ id });
  const { mutate: createAccommodation } = useCreateAccommodation();
  const { mutate: updateAccommodation } = useUpdateAccommodation();
  const { mutate: deleteAccommodation } = useDeleteAccommodation();

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<AccommodationReq>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      title: '',
      description: '',
      allowedNumberOfPeople: 1,
      availableFrom: String(new Date()),
      availableTo: String(new Date(dayjs().add(1, 'week').toDate())),
      thumbnailUrl: '',
      numberOfRooms: 1,
      previewImgUrl: '',
      price: 0,
      squareMeters: 0,
      address: {
        street: '',
        city: '',
        country: '',
        zipCode: '',
        latitude: 0,
        longitude: 0,
      },
    },
    values: accommodation?.data,
  });

  const latitudeWatch = watch('address.latitude');
  const longitudeWatch = watch('address.longitude');

  const navigateToRoot = () => {
    navigate(ROUTES.accommodations.root);
  };

  const onSubmit = (data: AccommodationReq) => {
    if (!id) {
      createAccommodation({
        ...data,
        availableFrom: dayjs(data.availableFrom).toISOString(),
        availableTo: dayjs(data.availableTo).toISOString(),
      });
      return;
    }
    if (!Object.keys(dirtyFields).length) {
      navigateToRoot();
      return;
    }
    updateAccommodation({
      ...data,
      id,
      availableFrom: dayjs(data.availableFrom).toISOString(),
      availableTo: dayjs(data.availableTo).toISOString(),
    });
  };

  const handleDelete = () => {
    if (id) {
      deleteAccommodation(id);
    }
  };

  const handleCoordsChange = ([latitude, longitude]: Coordinates) => {
    setValue('address.latitude', latitude, {
      shouldDirty: true,
    });
    setValue('address.longitude', longitude, {
      shouldDirty: true,
    });
  };

  return (
    <Box>
      <Typography variant="h4" textAlign="center" pb={4}>
        {id ? 'Edit' : 'Create'} Accommodation
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={4} py={4}>
          <FormField
            name="title"
            label="Title"
            control={control}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <FormField
            name="description"
            label="Description"
            control={control}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <FormDateField
            name="availableFrom"
            label="Available From"
            control={control}
            helperText={errors.availableFrom?.message}
          />
          <FormDateField
            name="availableTo"
            label="Available To"
            control={control}
            helperText={errors.availableTo?.message}
          />
          <FormField
            name="thumbnailUrl"
            label="Thumbnail Url"
            control={control}
            error={!!errors.thumbnailUrl}
            helperText={errors.thumbnailUrl?.message}
          />
          <FormField
            name="previewImgUrl"
            label="Preview Image Url"
            control={control}
            error={!!errors.previewImgUrl}
            helperText={errors.previewImgUrl?.message}
          />
          <FormField
            type="number"
            control={control}
            name="allowedNumberOfPeople"
            label="Allowed Number Of People"
            error={!!errors.allowedNumberOfPeople}
            helperText={errors.allowedNumberOfPeople?.message}
          />
          <FormField
            type="number"
            control={control}
            name="numberOfRooms"
            label="Number Of Rooms"
            error={!!errors.numberOfRooms}
            helperText={errors.numberOfRooms?.message}
          />
          <FormField
            type="number"
            control={control}
            name="price"
            label="Price"
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <FormField
            type="number"
            control={control}
            name="squareMeters"
            label="Square Meters"
            error={!!errors.squareMeters}
            helperText={errors.squareMeters?.message}
          />
          <FormField
            name="address.street"
            label="Street"
            control={control}
            error={!!errors.address?.street}
            helperText={errors.address?.street?.message}
          />
          <FormField
            name="address.city"
            label="City"
            control={control}
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message}
          />
          <FormField
            name="address.country"
            label="Country"
            control={control}
            error={!!errors.address?.country}
            helperText={errors.address?.country?.message}
          />
          <FormField
            name="address.zipCode"
            label="Zip Code"
            control={control}
            error={!!errors.address?.zipCode}
            helperText={errors.address?.zipCode?.message}
          />
          <Box sx={{ gridColumn: '1 / 3' }}>
            <YandexMap
              latitude={latitudeWatch}
              longitude={longitudeWatch}
              setCoords={handleCoordsChange}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent={id ? 'space-between' : 'flex-end'}>
          {id && (
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={navigateToRoot}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {id ? 'Update' : 'Create'}
            </Button>
          </Stack>
        </Box>
      </form>
    </Box>
  );
}
