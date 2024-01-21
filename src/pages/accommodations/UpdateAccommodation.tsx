import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { useDeleteAccommodation } from '@src/api/mutations/accommodations/useDeleteAccommodation';
import { useRestoreAccommodation } from '@src/api/mutations/accommodations/useRestoreAccommodation';
import { useUpdateAccommodation } from '@src/api/mutations/accommodations/useUpdateAccommodation';
import { useGetAccommodation } from '@src/api/queries/accommodations/useGetAccommodation';
import { ROUTES } from '@src/config/routes.config';
import { AccommodationReq, accommodationSchema } from '@src/types/accommodation.types';
import { Coordinates } from '@src/types/global.types';
import EditAmenities from '../accomodation/components/EditAmenities';
import FormFields from './components/FormFields';
import ConfirmationModal from './components/Modal';

function UpdateAccommodation() {
  const { id } = useParams();
  const { data: accommodation } = useGetAccommodation({ id });
  const { mutate: updateAccommodation } = useUpdateAccommodation();
  const { mutate: deleteAccommodation, isPending: isDeletePending } = useDeleteAccommodation();
  const { mutate: restoreAccommodation, isPending: isRestorePending } = useRestoreAccommodation();

  const navigate = useNavigate();
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<AccommodationReq>({
    resolver: zodResolver(accommodationSchema),
    values: accommodation?.data,
  });
  const isDeleted: boolean = !!accommodation?.data.isDeleted;

  const latitudeWatch = watch('address.latitude');
  const longitudeWatch = watch('address.longitude');

  const navigateToRoot = () => {
    navigate(ROUTES.accommodations.root);
  };

  const onSubmit = (data: AccommodationReq) => {
    if (!Object.keys(dirtyFields).length) {
      navigateToRoot();
      return;
    }
    if (id) {
      updateAccommodation({
        ...data,
        id,
        availableFrom: dayjs(data.availableFrom).toISOString(),
        availableTo: dayjs(data.availableTo).toISOString(),
      });
    }
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
        Edit Accommodation
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
              Update
            </Button>
          </Stack>
        </Box>
      </form>

      {accommodation && (
        <EditAmenities
          accommodationId={accommodation.data.id}
          isNew={false}
          accommodationAmenities={accommodation.data.amenities[0]}
        />
      )}
      <ConfirmationModal open={open} onClose={toggleOpen} onConfirm={handleConfirm} />
    </Box>
  );
}

export default UpdateAccommodation;
