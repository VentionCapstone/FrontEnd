import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCreateAccommodation } from '@src/api/mutations/accommodations/useCreateAccommodation';
import { useDeleteAccommodation } from '@src/api/mutations/accommodations/useDeleteAccommodation';
import { useRestoreAccommodation } from '@src/api/mutations/accommodations/useRestoreAccommodation';
import { useUpdateAccommodation } from '@src/api/mutations/accommodations/useUpdateAccommodation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import { ROUTES } from '@src/config/routes.config';
import {
  AccommodationFormProps,
  AccommodationReq,
  SelectAddress,
  accommodationSchema,
} from '@src/types/accommodation.types';
import { AccommodationSteps, Coordinates } from '@src/types/global.types';

import { CreateAccommodationRoute, EditAccommodation } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import FormFields from './FormFields';
import ConfirmationModal from './Modal';

function AccommodationForm({
  handleSearchParamsChange,
  accommodation,
  isNew,
}: AccommodationFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { mutate: createAccommodation, isPending } = useCreateAccommodation({
    handleSearchParamsChange,
  });
  const { mutate: updateAccommodation } = useUpdateAccommodation();
  const { mutate: deleteAccommodation, isPending: isDeletePending } = useDeleteAccommodation();
  const { mutate: restoreAccommodation, isPending: isRestorePending } = useRestoreAccommodation();

  const id = accommodation?.id;

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AccommodationReq>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      title: '',
      description: '',
      allowedNumberOfPeople: 1,
      availableFrom: String(new Date()),
      availableTo: String(new Date(dayjs().add(2, 'week').toDate())),
      numberOfRooms: 1,
      available: true,
      price: 1,
      squareMeters: 1,
      address: {
        street: '',
        city: '',
        country: '',
        zipCode: '1',
        latitude: 0,
        longitude: 0,
      },
    },
    values: accommodation as AccommodationReq,
  });

  const addressWatch = watch('address');
  const isDeleted: boolean = accommodation?.isDeleted || false;

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
    updateAccommodation({
      ...data,
      id,
      availableFrom: dayjs(data.availableFrom).toISOString(),
      availableTo: dayjs(data.availableTo).toISOString(),
    });
    handleSearchParamsChange(
      new URLSearchParams({
        currentStep: AccommodationSteps.media.toString(),
        accommodationId: id,
      })
    );
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

  const handleAddressChange = (address: SelectAddress) => {
    setValue('address.city', address.city, {
      shouldDirty: true,
    });
    setValue('address.country', address.country, {
      shouldDirty: true,
    });
    setValue('address.street', address.street, {
      shouldDirty: true,
    });
  };

  return (
    <Box>
      <Typography variant="lg" textAlign="center" pb={4} fontWeight={600}>
        {isNew ? `${t(CreateAccommodationRoute.create)}` : `${t(CreateAccommodationRoute.edit)}`}{' '}
        {t(CreateAccommodationRoute.accommodation)}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFields
          control={control}
          errors={errors}
          addressWatch={addressWatch}
          handleCoordsChange={handleCoordsChange}
          handleAddressChange={handleAddressChange}
        />
        <Box
          display="flex"
          justifyContent={isNew ? 'flex-end' : 'space-between'}
          alignItems={'center'}
        >
          {!isNew && (
            <>
              <LoadingButton
                variant="contained"
                size="large"
                sx={{
                  'fontWeight': 600,
                  'mt': 4,
                  'bgcolor': 'secondary.main',
                  ':hover': {
                    bgcolor: 'secondary.dark',
                  },
                }}
                onClick={isDeleted ? handleRestore : toggleOpen}
                loading={isDeleted ? isRestorePending : isDeletePending}
              >
                {isDeleted ? `${t(EditAccommodation.Restore)}` : `${t(EditAccommodation.Delete)}`}
              </LoadingButton>
            </>
          )}

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button size="large" sx={{ mt: 4 }} variant="outlined" onClick={navigateToRoot}>
              {t(CreateAccommodationRoute.cancel_btn)}
            </Button>
            <ButtonPrimary loading={isPending}>
              {t(CreateAccommodationRoute.next_btn)}
            </ButtonPrimary>
          </Box>
        </Box>
      </form>
      <ConfirmationModal open={open} onClose={toggleOpen} onConfirm={handleConfirm} />
    </Box>
  );
}

export default AccommodationForm;
