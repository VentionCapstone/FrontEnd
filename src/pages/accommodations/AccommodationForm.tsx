import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useCreateAccommodation } from '@/api/mutations/accommodations/useCreateAccommodation';
import { useDeleteAccommodation } from '@/api/mutations/accommodations/useDeleteAccommodation';
import { useRestoreAccommodation } from '@/api/mutations/accommodations/useRestoreAccommodation';
import { useUpdateAccommodation } from '@/api/mutations/accommodations/useUpdateAccommodation';
import { useGetAccommodation } from '@/api/queries/accommodations/useGetAccommodation';
import YandexMap from '@/components/YandexMap';
import { ROUTES } from '@/config/routes.config';
import { AccommodationReq, accommodationSchema } from '@/types/accommodation.types';
import { Coordinates } from '@/types/global.types';
import { FormDateField } from './FormDateField';
import { FormField } from './FormField';

import LoadingButton from '@mui/lab/LoadingButton';
import { useCallback, useState } from 'react';
import ConfirmationModal from './components/Modal';

export default function AccommodationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: accommodation } = useGetAccommodation({ id });
  const { mutate: createAccommodation } = useCreateAccommodation();
  const { mutate: updateAccommodation } = useUpdateAccommodation();
  const { mutate: deleteAccommodation, isPending: isDeletePending } = useDeleteAccommodation();
  const { mutate: restoreAccommodation, isPending: isRestorePending } = useRestoreAccommodation();

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

  const isDeleted: boolean = !!accommodation?.data.isDeleted;

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

  const handleDelete = useCallback(() => {
    if (id) {
      deleteAccommodation(id);
    }
  }, [id, deleteAccommodation]);

  const handleRestore = useCallback(() => {
    if (id) {
      restoreAccommodation(id);
    }
  }, [id, restoreAccommodation]);

  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen((prevOpen) => !prevOpen), []);

  const handleConfirm = useCallback(() => {
    handleDelete();
    toggleOpen();
  }, [handleDelete, toggleOpen]);

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
            <>
              <LoadingButton
                variant="contained"
                color={isDeleted ? 'primary' : 'secondary'}
                onClick={isDeleted ? handleRestore : toggleOpen}
                loading={isDeleted ? isRestorePending : isDeletePending}
              >
                {isDeleted ? 'Restore' : 'Delete'}
              </LoadingButton>
            </>
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
      <ConfirmationModal open={open} onClose={toggleOpen} onConfirm={handleConfirm} />
    </Box>
  );
}
