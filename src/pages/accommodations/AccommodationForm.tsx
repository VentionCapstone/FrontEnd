import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useCreateAccommodation } from '@src/api/mutations/accommodations/useCreateAccommodation';
import { useDeleteAccommodation } from '@src/api/mutations/accommodations/useDeleteAccommodation';
import { useRestoreAccommodation } from '@src/api/mutations/accommodations/useRestoreAccommodation';
import { useUpdateAccommodation } from '@src/api/mutations/accommodations/useUpdateAccommodation';
import { useGetAccommodation } from '@src/api/queries/accommodations/useGetAccommodation';
import { ROUTES } from '@src/config/routes.config';
import { AccommodationReq, accommodationSchema } from '@src/types/accommodation.types';
import { Coordinates } from '@src/types/global.types';

import LoadingButton from '@mui/lab/LoadingButton';
import { useCallback, useState } from 'react';
import FormFields from './components/FormFields';
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
      numberOfRooms: 1,
      available: true,
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
        <FormFields
          control={control}
          errors={errors}
          latitudeWatch={latitudeWatch}
          longitudeWatch={longitudeWatch}
          handleCoordsChange={handleCoordsChange}
        />
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
