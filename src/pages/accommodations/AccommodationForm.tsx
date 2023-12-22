import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useCreateAccommodation } from '@/api/mutations/accommodations/useCreateAccommodation';
import { useDeleteAccommodation } from '@/api/mutations/accommodations/useDeleteAccommodation';
import { useUpdateAccommodation } from '@/api/mutations/accommodations/useUpdateAccommodation';
import { useGetAccommodation } from '@/api/queries/accommodations/useGetAccommodation';
import { ROUTES } from '@/config/routes.config';
import { AccommodationReq, accommodationSchema } from '@/types/accommodation.types';

export default function AccommodationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: accommodation } = useGetAccommodation({ id });
  const { mutate: createAccommodation } = useCreateAccommodation();
  const { mutate: updateAccommodation } = useUpdateAccommodation();
  const { mutate: deleteAccommodation } = useDeleteAccommodation();

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<AccommodationReq>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      name: '',
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

  const onSubmit = (data: AccommodationReq) => {
    if (id) {
      if (!Object.keys(dirtyFields).length) {
        navigate(ROUTES.accommodations.root);
        return;
      } else {
        updateAccommodation({
          ...data,
          id,
          availableFrom: dayjs(data.availableFrom).toISOString(),
          availableTo: dayjs(data.availableTo).toISOString(),
        });
      }
    } else {
      createAccommodation({
        ...data,
        availableFrom: dayjs(data.availableFrom).toISOString(),
        availableTo: dayjs(data.availableTo).toISOString(),
      });
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteAccommodation(id);
    }
  };

  return (
    <Box>
      <Typography variant="h4" textAlign="center" pb={4}>
        {id ? 'Edit' : 'Create'} Accommodation
      </Typography>
      <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={4} py={4}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ gridColumn: '1 / 3' }}
                {...field}
                label="Description"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name="availableFrom"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  format="MM-DD-YYYY"
                  label="Available From"
                  value={dayjs(field.value)}
                  helperText={errors.availableFrom?.message}
                  onChange={(newValue) => field.onChange(dayjs(newValue))}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="availableTo"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  format="MM-DD-YYYY"
                  label="Available To"
                  value={dayjs(field.value)}
                  helperText={errors.availableFrom?.message}
                  onChange={(newValue) => field.onChange(dayjs(newValue))}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="thumbnailUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Preview Image Url"
                error={!!errors.thumbnailUrl}
                helperText={errors.thumbnailUrl?.message}
              />
            )}
          />
          <Controller
            name="previewImgUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Preview Image Url"
                error={!!errors.previewImgUrl}
                helperText={errors.previewImgUrl?.message}
              />
            )}
          />
          <Controller
            name="allowedNumberOfPeople"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Allowed Number Of People"
                error={!!errors.allowedNumberOfPeople}
                helperText={errors.allowedNumberOfPeople?.message}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          <Controller
            name="numberOfRooms"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Number Of Rooms"
                error={!!errors.numberOfRooms}
                helperText={errors.numberOfRooms?.message}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                error={!!errors.price}
                helperText={errors.price?.message}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          <Controller
            name="squareMeters"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Square Meters"
                error={!!errors.squareMeters}
                helperText={errors.squareMeters?.message}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
          <Controller
            name="address.street"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Street"
                error={!!errors.address?.street}
                helperText={errors.address?.street?.message}
              />
            )}
          />
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
              />
            )}
          />
          <Controller
            name="address.country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                error={!!errors.address?.country}
                helperText={errors.address?.country?.message}
              />
            )}
          />
          <Controller
            name="address.zipCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Zip Code"
                error={!!errors.address?.zipCode}
                helperText={errors.address?.zipCode?.message}
              />
            )}
          />
        </Box>
        <Box display="flex" justifyContent={id ? 'space-between' : 'flex-end'}>
          {id && (
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => navigate(ROUTES.accommodations.root)}>
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
