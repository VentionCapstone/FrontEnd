import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import { useCreateAccommodation } from '@src/api/mutations/accommodations/useCreateAccommodation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import {
  AccommodationReq,
  AccommodationStepType,
  accommodationSchema,
} from '@src/types/accommodation.types';
import { Coordinates } from '@src/types/global.types';
import FormFields from './FormFields';

function AccommodationForm({ setCurrentStep, setAccommodationId }: AccommodationStepType) {
  const { mutate: createAccommodation, isPending } = useCreateAccommodation({
    setCurrentStep,
    setAccommodationId,
  });

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
      availableTo: String(new Date(dayjs().add(1, 'week').toDate())),
      numberOfRooms: 1,
      available: true,
      price: 1,
      squareMeters: 1,
      address: {
        street: '',
        city: '',
        country: '',
        zipCode: '',
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const latitudeWatch = watch('address.latitude');
  const longitudeWatch = watch('address.longitude');

  const onSubmit = (data: AccommodationReq) => {
    createAccommodation({
      ...data,
      availableFrom: dayjs(data.availableFrom).toISOString(),
      availableTo: dayjs(data.availableTo).toISOString(),
    });
    return;
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
      <Typography variant="lg" textAlign="center" pb={4} fontWeight={600}>
        Create Accommodation
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFields
          control={control}
          errors={errors}
          latitudeWatch={latitudeWatch}
          longitudeWatch={longitudeWatch}
          handleCoordsChange={handleCoordsChange}
        />
        <Box
          sx={{
            ml: 'auto',
            marginTop: 2,
            width: '10%',
          }}
        >
          <ButtonPrimary loading={isPending}>Next Step</ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
}

export default AccommodationForm;
